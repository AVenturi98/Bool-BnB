const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.Port || 3000
const propertiesController = require('./routers/propertiesRouter')
const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')
const trimString = require('./middlewares/trimString')


app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)



app.use(express.json())
app.use(express.static('public'))





app.get('/', (req, res) => {
  res.send('Server is running')
})

//Rotta 
app.use('/api/properties/', propertiesController)


//Middlewares
app.use(errorsHandler)
app.use(notFound)
// app.use(trimString)


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})