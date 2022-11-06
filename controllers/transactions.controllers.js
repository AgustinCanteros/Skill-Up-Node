const createHttpError = require("http-errors");
const { Transactions } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

// example of a controller. First call the service, then build the controller method
module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      const response = await Transactions.create(req.body);

      endpointResponse({
        res,
        message: "Transaction created successfully.",
        body:response
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [Transaction - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getTransactionsById: catchAsync(async (req, res, next) => {
    try {
      const idQuery = req.query.userId;
      const response = await Transactions.findAll({
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
