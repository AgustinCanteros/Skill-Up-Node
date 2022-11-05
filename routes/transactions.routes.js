const express = require('express');
const { postCreateTransaction } = require('../controllers/transactions.controllers');
const postTransactionSchema = require('../schemas/transaction/postTransactionSchema');
const {
    validateRequestSchema,
  } = require('../middlewares/validation/validate-schema.middleware');
const { getTransactionsById } = require('../controllers/transactions');
const { getValidationById } = require('../schemas/transaction');

const router = express.Router();


router.get('/transactions',validateRequestSchema(getValidationById), getTransactionsById);
router.post('/', validateRequestSchema(postTransactionSchema), postCreateTransaction);

module.exports = router;
