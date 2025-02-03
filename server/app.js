const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.Port || 3000
const propertiesController = require('./routers/propertiesRouter')
const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')
const trimString = require('./middlewares/trimString')
const nodemailer = require('nodemailer')


app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)

app.use(express.json())

// nodemailer mail sender (NON TOCCARE!1!1!)
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: "7c529b9f234cee",
    pass: "4e7169ea3d8100"
  }
});

app.post('/send', (req, res) => {
  const { firstName, lastName, email, message, owner } = req.body;
  console.log(req.body);
  

  const mailOptions = {
    from: `"${firstName}" "${lastName}" <${email}>`,
    to: `${owner}`,
    subject: 'Nuovo Messaggio da Cliente',
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Errore nell\'invio della mail.' });
    }
    res.status(200).json({ message: 'Email inviata con successo!' });
  });
});


app.post('/send-mail', (req, res) => {
  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "6afbfc534939434e07d0dc48c46993b0"
    }
  });

  const mailOptions = {
    from: '"BoolBnB"<info@demomailtrap.com>',
    to: "team1.boolean@gmail.com",  // Inserisci la tua mail 
    subject: "Grazie per l'interesse!",
    text: "Grazie per averci contattato, ti risponderemo al più presto!",
    html: `<h1>Grazie per averci contattato!</h1> <p>Verrai ricontattato al più presto!</p>` 
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Errore nell\'invio della mail.' });
    }
    res.status(200).json({ message: 'Email inviata con successo!' });
  });

});


app.use(express.static('public'))
app.use(trimString)


app.get('/', (req, res) => {
  res.send('Server is running')
})


//Rotta 
app.use('/api/properties/', propertiesController)


//Middlewares
app.use(errorsHandler)
app.use(notFound)


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})