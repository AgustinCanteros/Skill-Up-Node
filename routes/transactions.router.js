const express = require("express");
const {
  postCreateTransaction,
  getFindTransaction,
} = require("../controllers/transactions.controller");
const postTransactionSchema = require("../schemas/transaction/postTransactionSchema");
const getTransactionSchema = require("../schemas/transaction/getTrensactionSchema");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validate-schema.middleware");
const router = express.Router();

router.get(
  "/:id",
  validateRequestSchema(getTransactionSchema),
  getFindTransaction
);
router.put("/:id", validateRequestSchema(putValidation), put);
router.post(
  "/",
  validateRequestSchema(postTransactionSchema),
  postCreateTransaction
);

const { put } = require("../controllers/transactions.controller");
const putValidation = require("../schemas/transaction/putTransactionShema");

module.exports = router;
