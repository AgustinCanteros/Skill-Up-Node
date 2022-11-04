const express = require('express');
const { postCreateTransaction } = require('../controllers/transactions.controllers');
const postTransactionSchema = require('../schemas/transaction/postTransactionSchema');
const {
    validateRequestSchema,
  } = require('../middlewares/validation/validate-schema.middleware');
const { put } = require('../../controllers/transactions/')
const { putValidation } = require('../schemas/transaction');

const router = express.Router();

router.put('/transactions/:id', validateRequestSchema(putValidation), put);
router.post('/', validateRequestSchema(postTransactionSchema), postCreateTransaction);

module.exports = router
