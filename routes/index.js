const express = require('express')
const { get } = require('../controllers/index')
const transactionRoutes = require('./transactions.routes');
const categoriesRoutes = require('./categories.routes');

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/transactions', transactionRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router
