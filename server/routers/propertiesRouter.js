const express = require('express')
const router = express.Router()
const propertiesController = require('../controller/propertiesController')

//index
router.get('/', propertiesController.index)

//show
router.get('/:id', propertiesController.show)

//store
router.post('/', propertiesController.storeReview)


module.exports = router