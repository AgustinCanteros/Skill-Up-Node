const { Transactions } = require("../../database/models");
const { ErrorObject } = require("../../helpers");

module.exports = {
  deleteValidation: {
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
          } else if (validation.softDeletes !== 0) {
            throw new ErrorObject("the transaction has already been deleted", 404);
          }
        },
      },
    },
  }
};
