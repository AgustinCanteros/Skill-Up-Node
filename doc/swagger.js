const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const port = process.env.PORT || 3000;

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wallet-API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          description: "Security system",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${port}/`,
      },
    ],
  },

  apis: [`${path.join(__dirname, "../routes/*.js")}`],
};
module.exports = {
  swaggerJsDoc,
  swaggerUi,
  swaggerSpec,
};
