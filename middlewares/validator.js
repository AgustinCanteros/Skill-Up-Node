const { checkSchema, validationResult } = require('express-validator');
const { ErrorObject } = require('../helpers/error');
const createHttpError = require('http-errors');

module.exports = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      try {
        const errors = validationResult(req).array();
        const [error] = errors;

        if (errors.length > 0) throw new ErrorObject(error.msg, 422, errors);

        next();
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error retrieving index] - [index - GET]: ${error.message}`
        );
        next(httpError);
      }
    },
  ];
};
