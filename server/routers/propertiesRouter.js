const express = require('express')
const router = express.Router()
const propertiesController = require('../controller/propertiesController')

//index
router.get('/', propertiesController.index)

//show

router.get('/:id', propertiesController.show)

//store
router.post('/login', propertiesController.login)

router.post('/:id', propertiesController.storeReview)

router.post('/', propertiesController.storeProperty)

//Rotta per salvare i dati nel database
router.post('/:id/hearts', propertiesController.storeHearts)

//Rotta per riordinare i cuori
router.get('/:id/hearts', (req, res) => {
  propertiesController.getHearts(req, res);
});

module.exports = router