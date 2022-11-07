const express = require("express");
const {
  put,
  postCreateTransaction,
  getFindTransaction,
  getAllTransactions,
} = require("../controllers/transactions.controller");
const postTransactionSchema = require("../schemas/transaction/postTransactionSchema");
const getTransactionSchema = require("../schemas/transaction/getTrensactionSchema");
const putValidation = require("../schemas/transaction/putTransactionShema");
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
router.get("/", getAllTransactions);

module.exports = router;
