const { Users } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
  email: {
    isEmail: {
      errorMessage: "please enter a correct email"
    },
    notEmpty: {
      errorMessage: "email is null"
    },
    custom: {
      options: async (value, { req }) => {
        const { email } = req.body;
        const exist = await Users.findOne({
          where: {
            email,
          },
        });
        if (exist) {
          throw new ErrorObject("Email is registred in the database");
        }
      },
    },
  },
  firstName: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.firstName) {
          throw new ErrorObject("firstName is null");
        }
      },
    },
  },
  lastName: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.lastName) {
          throw new ErrorObject("lastName is null");
        }
      },
    },
  },
  password: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.password) {
          throw new ErrorObject("password is null");
        }
      },
    },
  },
};
