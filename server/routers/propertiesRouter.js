const express = require('express')
const router = express.Router()
// const propertiesController = require('../app')

//index
router.get('/', propertiesController.index)

//show
router.get('/:id', propertiesController.show)

//store
router.post('./:id', propertiesController.store)


module.exports = router