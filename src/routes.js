const express = require('express');
const routes = express.Router();
const ColaboradorController = require('./controllers/ColaboradorController');

routes.get('/', (req, res) => {
  res.status(200)
  res.send({ app: "agendamento"})
})

routes.get('/colaboradores', ColaboradorController.listarColaboradores)

module.exports = routes;