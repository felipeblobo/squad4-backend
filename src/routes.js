const express = require('express');
const ColaboradorController = require('./controllers/ColaboradorController');

const routes = express.Router();

routes.get('/colaboradores', ColaboradorController.listarColaboradores);
routes.get('/colaboradores/:id', ColaboradorController.colaboradorPorId);
routes.post('/colaboradores', ColaboradorController.cadastraColaborador);

module.exports = routes;