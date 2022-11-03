const express = require('express')
const { put } = require('../../controllers/transactions/transactions.controller')

const router = express.Router();

//pendiente configurarcion de middleware para  que la petición 
//contenga los campos user, category, amount y date
router.put('/transactions/:id', put);

module.exports = router