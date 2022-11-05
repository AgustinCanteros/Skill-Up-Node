const express = require('express')
const { getCategoriesById } = require('../controllers/category.controllers')

const router = express.Router()

// example of a route with index controller get function
router.get('/:id', getAllUsers)

module.exports = router