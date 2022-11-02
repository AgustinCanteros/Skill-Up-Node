const express = require('express')
const { getTransactionsById } = require('../controllers/transactions/transactions.controller')

const router = express.Router();


router.get('/transactions/?query=', getTransactionsById);

module.exports = router
