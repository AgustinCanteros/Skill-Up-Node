const { Categories } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
    findByIdSchema: {
      id: {
        custom: {
            options: async (value, { req }) => {
              const { id } = req.params;
              const exist = await Categories.findByPk(id);
              if (!exist) {
                throw new ErrorObject("the id does not exist in the database");
              }
            },
          },
      }
    },
  };