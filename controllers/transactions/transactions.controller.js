const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { TransactionsModel } = require("../../database/models");

module.exports = {
  getTransactionsById: catchAsync(async (req, res, next) => {
    try {
      const idQuery = req.query.userId;
      const User = req.user;
      if (idQuery === User.id || User.rol === "admin") {
        const response = await TransactionsModel.findAll({
          where: { userId: `${idQuery}` },
        });
        endpointResponse({
          res,
          message: "successfully",
          body: response,
        });
      } else {
        const httpError = createHttpError(
          `[Error retrieving User] - [Transactions - GET] - [Unauthorized]`,
          401
        );
        next(httpError);
      }
      // const response = await TransactionsModel.findAll()
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
