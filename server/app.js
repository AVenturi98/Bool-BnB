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
    html: `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grazie per il tuo interesse!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #16A34A;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #16A34A;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Grazie per il tuo interesse!</h2>
        </div>
        <div class="content">
            <p>Ciao,</p>
            <p>Abbiamo ricevuto la tua richiesta di interesse per la nostra struttura. Il nostro team ti contatterà al più presto per fornirti ulteriori dettagli e rispondere alle tue domande.</p>
            <p>Nel frattempo, puoi dare un'occhiata alle nostre offerte e disponibilità sul nostro sito:</p>
            <p style="text-align: center;"><a href="http://localhost:5173" class="button">Visita il nostro sito</a></p>
            <p>Grazie per averci scelto, a presto!</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Bool BnB - Tutti i diritti riservati.</p>
        </div>
    </div>
</body>`
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