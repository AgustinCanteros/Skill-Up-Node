const { ErrorObject } = require("../../helpers/error");

const idSchema = {
  id: {
    in: ["params"],
    isInt: true,
    toInt: true,
    errorMessage: "ID is wrong",
  },
  custom: {
    options: async (req) => {
      try {
        // const user = await Users.findByPk(userId);
        // if (!user) throw new ErrorObject("User not found", 404);
        const { id } = req.params;
        const response = await Transactions.findByPk(id);
        if (!response) {
          throw new ErrorObject("The transaction could not be found", 404);
        }
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = idSchema;
