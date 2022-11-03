const createHttpError = require('http-errors');
const { Category, User, Transaction } = require('../database/models');
const { ErrorObject } = require('../helpers/error');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');

// example of a controller. First call the service, then build the controller method
module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      const { description, amount, date, userId, categoryId } = req.body;

      await Transaction.create({
        description,
        amount,
        date,
        userId,
        categoryId,
      });

      const body = { description, amount, date };

      endpointResponse({
        res,
        message: 'Transaction created successfully.',
        body,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
