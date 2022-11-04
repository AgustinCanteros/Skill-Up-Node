const { Transactions } = require("../../database/models");
const { ErrorObject } = require("../../helpers");

module.exports = {
  putValidation: {
    id: {
      in: ["params", "query"],
      errorMessage: "ID is wrong",
      isInt: true,
      toInt: true,
      custom: {
        options: async ({ req }) => {
          const validation = await Transactions.findOne({
            where: { id: `${req.params.id}` },
          });
          if (!validation) {
            throw new ErrorObject("id the transaction don't exist", 404);
          }
        },
      },
    },
    userId: {
      in: ["body"],
      errorMessage: "User in the transaction don't exist",
      isInt: true,
      toInt: true,
    },
    categoryId: {
      in: ["body"],
      errorMessage: "Category in the transaction don't exist",
      isInt: true,
      toInt: true,
    },
    amount: {
      in: ["body"],
      errorMessage: "amount in the transaction don't exist",
    },
    date: {
      in: ["body"],
      errorMessage: "amount in the transaction don't exist",
      isDate: true,
      toDate: true,
    },
  }
};
