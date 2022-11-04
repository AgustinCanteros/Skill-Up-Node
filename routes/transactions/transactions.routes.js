const express = require('express');
const { getTransactionsById } = require('../../controllers/transactions');
const { requestValidation } = require('../../middlewares');
const { getValidationById } = require('../../schemas/transaction');

const router = express.Router();


router.get('/transactions',requestValidation(getValidationById), getTransactionsById);

module.exports = router;
