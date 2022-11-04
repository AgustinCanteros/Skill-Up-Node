const express = require('express')
const { put } = require('../../controllers/transactions/')
const { requestValidation } = require('../middlewares');
const { putValidation } = require('../schemas/transaction');

const router = express.Router();

router.put('/transactions/:id', requestValidation(putValidation), put);

module.exports = router