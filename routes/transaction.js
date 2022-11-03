const express = require('express');
const { postCreateTransaction } = require('../controllers/transaction');
const postTransactionSchema = require('../schemas/transaction/postTransactionSchema');
const validator = require('../middlewares/validator');
const router = express.Router();

router.post('/', validator(postTransactionSchema), postCreateTransaction);

module.exports = router;
