const express = require('express')
const { destroy } = require('../../controllers/transactions/transactions.controller')

const router = express.Router();


router.delete('/transactions/:id', destroy);

module.exports = router