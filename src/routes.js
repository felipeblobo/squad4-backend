const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200)
  res.send({ app: "agendamento"})
})

module.exports = routes;