const express = require('express')
const router = express.Router()
const propertiesController = require('../controller/propertiesController')

//index
router.get('/', propertiesController.index)

//show
router.get('/:id', propertiesController.show)

//store
router.post('/:id', propertiesController.storeReview)

router.post('/', propertiesController.storeProperty)

module.exports = router