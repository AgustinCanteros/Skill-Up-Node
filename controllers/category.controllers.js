const createHttpError = require("http-errors")
const { Categories } = require("../database/models")
const { endpointResponse } = require("../helpers/success")
const { catchAsync } = require("../helpers/catchAsync")

module.exports = {
  getCategoriesById: catchAsync(async (req, res, next) => {
    const { id } = req.params
    try {
      const response = await Categories.findByPk(id)
      if (!response) {
        const httpError = createHttpError(
          401,
          `[Error retrieving categories] - [index - GET]: Couldn't find a Categories`
        )
        return next(httpError)
      }

      endpointResponse({
        res,
        message: "Categories retrieved successfully",
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving categories] - [index - GET]: ${error.message}`
      )
      next(httpError)
    }
  }),
}
