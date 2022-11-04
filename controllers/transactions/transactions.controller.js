const createHttpError = require("http-errors");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
const { Transactions } = require("../../database/models");

module.exports = {
  put: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const validation = await Transactions.findAll( {
        where: { id: `${id}` },
      });
      if (validation) {
        const response = await Transactions.update(req.body, {
          where: { id: `${id}` },
        });
        endpointResponse({
          res,
          message: "successfully",
          body: response,
        });
      } else {
        const httpError = createHttpError(
          `[Error retrieving transaction] - [transaction - PUT]: id the transaction don't exist`
        );
        next(httpError);
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [transaction - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
