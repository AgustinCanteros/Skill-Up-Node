module.exports = {
    editCategorySchema: {
      name: {
        optional: true,
        errorMessage: "name is required",
      },
      description: {
        optional: true,
        errorMessage: "description is required",
      },
      id: {
        in: ["params"],
        isNumeric: {
          errorMessage: 'Id must be numeric.',
        },
      }
    },
  };
  