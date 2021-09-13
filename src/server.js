const express = require("express");
const cors = require("cors")
const routes = require("./routes");
const server = express();
const port = process.env.PORT || 8080;
const swaggerFile=require('./swagger/swagger_output.json');
const swaggerUi = require("swagger-ui-express");

server.use('/',swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.options("/", cors(), function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://orange-space.herokuapp.com/");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
server.use(cors({
  origin: "*"
}));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

server.listen(port, console.log(`Server running on port ${port}.`));
