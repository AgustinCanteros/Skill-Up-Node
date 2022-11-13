module.exports = {
    id: {
      in: ["params"],
      errorMessage: "ID is wrong",
      isNumeric: {
        errorMessage: 'Id must be numeric.',
      }
    }
};
