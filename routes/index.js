const express = require('express')
const transactionRoutes = require('./transactions.router');
const usersRoutes = require('./users.router')

const router = express.Router()

// example of a route with index controller get function
router.use('/transactions', transactionRoutes);
router.use('/users', usersRoutes)

module.exports = router
