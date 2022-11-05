const express = require('express')
const { destroy } = require('../controllers/transactions/')
const { deleteValidation } = require('../schemas/transaction');
const { postCreateTransaction } = require('../controllers/transactions.controllers');
const postTransactionSchema = require('../schemas/transaction/postTransactionSchema');
const {
  validateRequestSchema,
} = require('../middlewares/validation/validate-schema.middleware');

const router = express.Router();
router.post('/', validateRequestSchema(postTransactionSchema), postCreateTransaction);
router.delete('/transactions/:id', validateRequestSchema(deleteValidation), destroy);

module.exports = router;
