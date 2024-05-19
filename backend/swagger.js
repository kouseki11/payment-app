const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Payment App",
    description: "DEV TESTING",
  },
  host: "localhost:3333",
};

const outputFile = "./swagger.json";
const routes = ["./index.js"];

swaggerAutogen(outputFile, routes, doc);
