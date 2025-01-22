const connection = require('../data/db')

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
      property.img = `${process.env.BE_HOST}/properties/${property.img}`
    })

    // Rispondi con i dati delle proprietà in formato JSON
    res.json(properties);
  });
}

//show
function show(req, res) {
  const id = parseInt(req.params.id)

  const sql = `SELECT * FROM properties WHERE id = ?`

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ message: 'BnB not found' })

    const bnb = results[0]

    // path immagine
    bnb.img = `${process.env.BE_HOST}/properties/${bnb.img}`

    const sql = `SELECT * FROM reviews WHERE property_id = ?`

    connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message })

      bnb.reviews = results
      res.json(bnb)
    })
  })

}

//storeProperty
function storeProperty(req, res) {
  const { title, rooms, beds, bathrooms, m2, address, city, building_type, email, img } = req.body


  if (
    !rooms || isNaN(rooms) || rooms < 0 ||
    !beds || isNaN(beds) || beds < 0 ||
    !bathrooms || isNaN(bathrooms) || bathrooms < 0 ||
    !m2 || isNaN(m2) || m2 < 0) {
    return res.status(400).send({ message: 'Rooms,beds,bathrooms e m2 devono essere numeri positivi' })
  }
  if (
    !title || typeof (title) !== 'string' ||
    !address || typeof (address) !== 'string' ||
    !city || typeof (city) !== 'string' ||
    !building_type || typeof (building_type) !== 'string' ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !img || typeof (img) !== 'string'
  ) {
    return res.status(400).send({ message: 'Titolo, indirizzo, city, building_type, email, img not invalid' })
  }


  const sql_post = `
          INSERT INTO properties ( title, rooms, beds, bathrooms, m2, address, city, building_type, email, img )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  connection.query(sql_post, [title, rooms, beds, bathrooms, m2, address, city, building_type, email, img], (err, newProp) => {
    if (err) return res.status(500).json({ message: 'Database query failed' })
    res.status(201).json({ message: 'Proprietà aggiunta' })
  })

}
//storeReview
function storeReview(req, res) {
  const { text, name, days, vote } = req.body

  const id = req.params.id

  if (
    !days || isNaN(days) || days < 0 ||
    !vote || isNaN(vote) || vote < 0
  ) {
    return res.status(400).send({ message: 'Days e vote devono essere numeri positivi' })
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
          VALUES (?, ?, ?, ?, ${id})`

  connection.query(sql_post, [text, name, days, vote, id], (err, newRev) => {
    if (err) return res.status(500).json({ message: err })
    res.status(201).json({ message: 'Recensione aggiunta' })
  })

}

module.exports = { index, show, storeReview, storeProperty }