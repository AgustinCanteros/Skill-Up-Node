const express = require('express')
const transactionRoutes = require('./transactions.routes');

const router = express.Router()

// example of a route with index controller get function
router.use('/api/v1', transactionRoutes);

module.exports = router
