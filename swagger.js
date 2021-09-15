const swaggerAutogen = require('swagger-autogen')();

const outputFile = "./src/swagger/swagger_output.json";
const endpointFiles = ['./src/server.js'];

swaggerAutogen( outputFile, endpointFiles );