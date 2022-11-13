const { Categories } = require("../../database/models");
const {ErrorObject} = require('../../helpers/error')

module.exports = {
    editCategorySchema: {
      name: {
        optional: false,
        notEmpty: true,
        errorMessage: "name is required",
      },
      description: {
        notEmpty: {
          errorMessage: "description is null"
        },
      },
      id: {
        custom: {
          options: async (value, {req}) => {
            const {id} = req.params
            const exist = await Categories.findByPk(id)
            if(!exist) throw new ErrorObject('Category not found', 404)
          }
        }
      },
    },
  };
  