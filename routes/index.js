const express = require('express')
const transactionRoutes = require('./transactions.routes');

const router = express.Router()

// example of a route with index controller get function
router.use('/transactions', transactionRoutes);

module.exports = router
