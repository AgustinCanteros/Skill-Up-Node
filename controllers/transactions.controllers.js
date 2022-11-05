const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { Transactions } = require("../database/models");

module.exports = {
  destroy: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await Transactions.update({"softDeletes": 1}, {
        where: { id: `${id}` },
      });
      endpointResponse({
        res,
        message: "successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [transaction - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
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
};
