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
        in: ["params"],
        isNumeric: {
          errorMessage: 'Id must be numeric.',
        },
      }
    },
  };
  