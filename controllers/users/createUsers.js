const createError = require("http-errors");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
// IMPORTAR EL MODELO USER DE LA BASE DE DATOS //
const { UsersModel } = require("../../database/models/usersModel");
// IMPORTAR EL MODELO ROL DE LA BASE DE DATOS //
const { RoleModel } = require("../../database/models/roleModel");

module.exports = {
  createUsers: catchAsync(async (req, res, next) => {
    const { firstname, lastname, email, password, avatar, role } = req.body; // REQUIERE VERIFICACION EXTERNA MIDDLEWARE || EMAIL Y PASSWORD PROBABLEMENTE VENGAN EN UN HEADER CODIFICADO //
    try {
      const [created, user] = UsersModel.create({
        firstname,
        lastname,
        email,
        password,
        avatar,
      }, {
        include: [{
          association: RoleUser, // NOMBRE DE LA ASOCIACION //
          include: [role]
        }]
      });

      if (created === true) {
        endpointResponse({ res, message: "User was created", body: user });
      } else {
        const httpError = createError(500, "User not created");
        next(httpError);
      }
    } catch (error) {
      const httpError = createError(
        error.statusCode,
        error.message
      );
    }
  }),
};