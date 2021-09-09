const express = require("express");
const cors = require("cors")
const routes = require("./routes");
const server = express();
const port = 8080;

server.use(cors({
  origin: '*'
}));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

server.listen(port, console.log(`Server running on port ${port}.`));
