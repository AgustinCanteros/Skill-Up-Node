const express = require("express");
const {
  put,
  postCreateTransaction,
  deleteTransaction,
  getFindTransaction,
  getAllTransactions,
} = require("../controllers/transactions.controller");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validate-schema.middleware");

const router = express.Router();

const postTransactionSchema = require("../schemas/transaction/postTransactionSchema");
const getTransactionSchema = require("../schemas/transaction/getTrensactionSchema");

const getValidationById = require("../schemas/transaction/getTransactionsSchemaById");
const putValidation = require("../schemas/transaction/putTransactionShema");
const deleteValidation = require("../schemas/transaction/deleteTransactionsSchema");


/** 
 * @swagger
 * components:
 *     schemas:
 *       Transactions:
 *         type: object
 *         properties:
 *           description:
 *             type: string
 *           amount:
 *             type: number
 *             format: float
 *           userId:
 *             type: integer
 *           categoryId:
 *             type: integer
 *           softDeletes:
 *             type: string
 *             format: date
 *         required:
 *            - amount
 *            - userId
 *            - categoryId
 *            - date
 *            
 * 
 */

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

router.get("/",validateRequestSchema(getValidationById),getAllTransactions);

router.delete(
  "/:id",
  validateRequestSchema(deleteValidation),
  deleteTransaction
);

module.exports = router;
