const connection = require('../data/db')

// Funzione che gestisce la richiesta per ottenere le proprietà e il voto medio
function index(req, res) {
  // Query SQL per ottenere le proprietà e il voto medio
  const sql = `
    SELECT properties.*, AVG(reviews.vote) AS avg_vote
    FROM properties
    LEFT JOIN reviews ON properties.id = reviews.property_id
    GROUP BY properties.id
  `;
  // Esegui la query
  connection.query(sql, (err, properties) => {
    if (err) {
      // Gestisci l'errore e rispondi con stato 500
      return res.status(500).json({ error: "Errore nel recupero dei dati" });
    }
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

  const sql_post = `
          INSERT INTO properties ( title, rooms, beds, bathrooms, m2, address, city, building_type, email, img )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  connection.query(sql_post, [ title, rooms, beds, bathrooms, m2, address, city, building_type, email, img], (err, newProp) => {
    if (err) return res.status(500).json({ message: 'Database query failed' })
    res.status(201).json({ message: 'Proprietà aggiunta' })
  })

}
//storeReview
function storeReview(req, res) {
  const { text, name, days, date, vote, property_id } = req.body

  const sql_post = `
          INSERT INTO reviews (text, name, days, date, vote, property_id)
          VALUES (?, ?, ?, ?, ?, ?)`

  connection.query(sql_post, [text, name, days, date, vote, property_id], (err, newRev) => {
    if (err) return res.status(500).json({ message: 'Database query failed' })
    res.status(201).json({ message: 'Recensione aggiunta' })
  })

}

module.exports = { index, show, storeReview, storeProperty}