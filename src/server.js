const express = require("express");
const cors = require("cors")
const routes = require("./routes");
const server = express();
const port = process.env.PORT || 8080;

server.use(cors({ origin: "https://orange-space.herokuapp.com/", credentials: true }))
server.options('*', cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

server.listen(port, console.log(`Server running on port ${port}.`));
