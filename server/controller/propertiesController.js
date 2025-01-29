const connection = require('../data/db.js')
const jwt = require("jsonwebtoken");

// Funzione che gestisce la richiesta per ottenere le proprietà e il voto medio
function index(req, res) {
  // Query SQL per ottenere le proprietà e il voto medio
  const sql = `
    SELECT properties.*, AVG(reviews.vote) AS avg_vote
    FROM properties
    LEFT JOIN reviews ON properties.id = reviews.property_id
    GROUP BY properties.id
    ORDER BY properties.hearts DESC
  `;
  // Esegui la query
  connection.query(sql, (err, properties) => {
    if (err) {
      // Gestisci l'errore e rispondi con stato 500
      return res.status(500).json({ error: "Errore nel recupero dei dati" });
    }

    // path immagine
    properties.forEach(property => {
      if (property.img && !property.img.startsWith('http')) {
        property.img = `${process.env.BE_HOST}/properties/${property.img}`;
      }
    });

    // Rispondi con i dati delle proprietà in formato JSON
    res.json(properties);
  });
}

//my properties
function myProperties(req, res) {
  const token = req.headers.authorization.split(' ')[1]; // Estrai il token dall'header
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Decodifica il token
    const ownerID = decoded.id; // Estrai l'ID del proprietario dal token

    const sql = `  SELECT properties.*, AVG(reviews.vote) AS avg_vote
  FROM properties
  LEFT JOIN reviews ON properties.id = reviews.property_id
  WHERE properties.owner_id = ?
  GROUP BY properties.id
  ORDER BY properties.hearts DESC`;
    connection.query(sql, [ownerID], (err, properties) => {
      if (err) {
        console.error('Errore nella query:', err);
        return res.status(500).json({ message: 'Errore recupero dati dal database' });
      }
      // path immagine
    properties.forEach(property => {
      if (property.img && !property.img.startsWith('http')) {
        property.img = `${process.env.BE_HOST}/properties/${property.img}`;
      }
    });
      res.json(properties);
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token non valido o scaduto" });
  }
}

//show
function show(req, res) {
  const id = parseInt(req.params.id)

  const sql = `
          SELECT *
          FROM properties
          WHERE properties.id = ?
          `


  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ message: 'BnB not found' })

    const bnb = results[0]


    // Controlla se l'URL dell'immagine è già completo
    if (bnb.img && !bnb.img.startsWith('http')) {
      bnb.img = `${process.env.BE_HOST}/properties/${bnb.img}`;
    }

    const sql = `SELECT *, date_format(reviews.date, '%d-%m-%Y') as date_it
     FROM reviews WHERE property_id = ?`

    connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message })

      bnb.reviews = results

      const sql_avg = `SELECT FLOOR(AVG(vote)) as avg_vote FROM reviews WHERE property_id = ?`

      connection.query(sql_avg, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })

        bnb.avg_vote = results[0].avg_vote
      })


      const sql_owner = `
          SELECT owners.name AS 'name', owners.email as owner_email
          FROM properties
          JOIN owners ON owners.id = properties.owner_id AND properties.id = ?
      `
      connection.query(sql_owner, [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message })

        bnb.owner = result

        res.json(bnb)
      })
    })
  })
}

function storeProperty(req, res) {
  const { title, rooms, beds, bathrooms, m2, address, city, building_type, email, img, token, description } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Decodifica il token
    const ownerID = decoded.id; // Estrai l'ID del proprietario dal token

    if (
      !rooms || isNaN(rooms) || rooms < 0 ||
      !beds || isNaN(beds) || beds < 0 ||
      !bathrooms || isNaN(bathrooms) || bathrooms < 0 ||
      !m2 || isNaN(m2) || m2 < 0
    ) {
      return res.status(400).send({ message: 'Rooms, beds, bathrooms e m2 devono essere numeri positivi' });
    }

    if (
      !title || typeof title !== 'string' ||
      !address || typeof address !== 'string' ||
      !city || typeof city !== 'string' ||
      !building_type || typeof building_type !== 'string' ||
      !description || typeof description !== 'string' ||
      !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).send({ message: 'Titolo, indirizzo, city, building_type, email, descrizione non validi' });
    }

    const finalImg = img && !img.startsWith('http')
      ? `${process.env.BE_HOST}/properties/${img}`
      : img;

    const sql_post = `
      INSERT INTO properties (title, rooms, beds, bathrooms, m2, address, city, building_type, email, img, owner_id, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql_post, [title, rooms, beds, bathrooms, m2, address, city, building_type, email, finalImg, ownerID, description], (err, newProp) => {
      if (err) {
        console.error('Database query failed:', err.stack);
        return res.status(500).json({ message: 'Database query failed' });
      }
      res.status(201).json({ message: 'Proprietà aggiunta' });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token non valido o scaduto" });
  }
}

//storeReview
function storeReview(req, res) {
  const { text, name, days, vote } = req.body

  const id = req.params.id

  if (
    !days || isNaN(days) || days < 0 ||
    !vote || isNaN(vote) || vote < 0 || vote > 5
  ) {
    return res.status(400).send({ message: 'Days deve essere un numero positivo e vote deve essere compreso tra 0 e 5' })
  }


  if (
    !text || typeof (text) !== 'string' ||
    !name || typeof (name) !== 'string'
    // (!date || !(date instanceof Date))
  ) {
    return res.status(400).send({ message: 'Text,name or date invalid' })
  }

  const sql_post = `
          INSERT INTO reviews (text, name, days, vote, property_id)
          VALUES (?, ?, ?, ?, ?)`

  connection.query(sql_post, [text, name, days, vote, id], (err, newRev) => {
    if (err) return res.status(500).json({ message: err })
    res.status(201).json({ message: 'Recensione aggiunta' })
  })

}

const SECRET_KEY = "10"; // Usa una chiave sicura in produzione

function login(req, res) {
  const { email, password } = req.body;

  // Query per ottenere l'utente dal database
  const query = 'SELECT * FROM owners WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).send('Errore del server');
    }

    if (results.length === 0) {
      return res.status(401).send('Email o password non corretti');
    }

    const owner = results[0]
    const ownerName = owner.name;

    // Genera il token JWT
    const token = jwt.sign({ id: owner.id, email: owner.email, ownerName: owner.name }, SECRET_KEY, { expiresIn: "5h" });

    res.status(200).json({ token, ownerName });
  });
};

//Funzione per salvare i cuori
function storeHearts(req, res) {
  const id = req.params.id;
  const { hearts } = req.body;

  const query = 'UPDATE `bool_bnb_db`.`properties` SET `hearts` = ? WHERE `id` = ?';

  connection.query(query, [hearts, id], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ message: 'Errore recupero dati dal contatore' });
    }
    res.status(200).json({ message: 'Contatore aggiornato con successo!' });
  });
}

//Funzione per ricontare i cuori e metterli in ordine
function getHearts(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT hearts FROM properties WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Errore nel recupero dei cuori' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Proprietà non trovata' });
    }
    res.json({ hearts: results[0].hearts });
  });
}

module.exports = { index, show, storeReview, storeProperty, login, storeHearts, getHearts, myProperties }