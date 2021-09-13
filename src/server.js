const express = require("express");
const cors = require("cors")
const routes = require("./routes");
const server = express();
const port = process.env.PORT || 8080;
const swaggerFile=require('./swagger/swagger_output.json');
const swaggerUi = require("swagger-ui-express");

cors({credentials: true, origin: true});
server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Tupe, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
})

server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

server.listen(port, console.log(`Server running on port ${port}.`));
