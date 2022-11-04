const express = require('express')
const { destroy } = require('../controllers/transactions/')
const { requestValidation } = require('../middlewares');
const { deleteValidation } = require('../schemas/transaction');

const router = express.Router();


router.delete('/transactions/:id', requestValidation(deleteValidation), destroy);

module.exports = router