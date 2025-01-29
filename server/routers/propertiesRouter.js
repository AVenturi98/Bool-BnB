const express = require('express')
const router = express.Router()
const propertiesController = require('../controller/propertiesController')

//index
router.get('/', propertiesController.index)

//my properties
router.get('/my-properties', propertiesController.myProperties)

//Rotta per la ricerca
router.get('/ricerca', propertiesController.search);

//show
router.get('/:id', propertiesController.show)

//store
router.post('/login', propertiesController.login)

router.post('/:id', propertiesController.storeReview)

router.post('/', propertiesController.storeProperty)

//Rotta per salvare i dati nel database
router.post('/:id/hearts', propertiesController.storeHearts)

//Rotta per riordinare i cuori
router.get('/:id/hearts', propertiesController.getHearts);



module.exports = router