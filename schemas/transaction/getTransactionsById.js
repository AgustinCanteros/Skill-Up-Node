const { checkShecma } = require("express-validator");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
  getValidationById: checkShecma({
    userId: {
      in: ["query"],
      errorMessage: "ID is worn",
      isInt: true,
      custom: {
        options: async (value, { req }) => {
          try {
            const User = req.user;
            if (!(value === User.id || User.rol === "admin")) {
                throw new ErrorObject(`[Error retrieving Transactions] - [Transactions - GET]: user ${User} not authorized to access the information.`, 401);
            }
          } catch (error) {
            throw error;
          }
        },
      },
    },
  }),
};
