const createHttpError = require("http-errors");
const { Transactions } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error");

// example of a controller. First call the service, then build the controller method
module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      const response = await Transactions.create(req.body);

      endpointResponse({
        res,
        message: "Transaction created successfully.",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [Transaction - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getFindTransaction: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Transactions.findByPk(id);
      if (!response) {
        throw new ErrorObject("The transaction could not be found", 404);
      }
      endpointResponse({
        res,
        message: "Transaction found successfully.",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [Transaction - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
