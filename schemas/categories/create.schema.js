module.exports = {
  createCategorySchema: {
    name: {
      optional: false,
      notEmpty: true,
      errorMessage: "name is required",
    },
    description: {
      notEmpty: {
        errorMessage: "description is null"
      },
    }
  },
};
