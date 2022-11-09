const createHttpError = require('http-errors')
const { Users } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { Security } = require('../config/security')

module.exports = {
    login: catchAsync(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({
                where: { email }
            });

            if (!user) {
                endpointResponse({
                    res,
                    code: 404,
                    message: 'User does not exist',
                    body: { ok: false },
                });
            }

            if (!await Security.compare(password, user.password)) {
                endpointResponse({
                    res,
                    code: 403,
                    message: 'Invalid password',
                    body: { ok: false },
                });
            }

            endpointResponse({
                res,
                message: 'User login successfully',
                body: { ok: true },
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error login authentication] - [auth/login - POST]: ${error.message}`,
            )
            next(httpError)
        }
    }),
}