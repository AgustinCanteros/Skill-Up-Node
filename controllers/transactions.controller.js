const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { Transaction } = require("../database/models");

module.exports = {
  getTransactionsById: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll({
        where: { userId: `${idQuery}` },
      });
      endpointResponse({
        res,
        message: "successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transactions] - [Transactions - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
