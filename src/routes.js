const express = require('express');
const ColaboradorController = require('./controllers/ColaboradorController');
const AgendamentoController = require('./controllers/AgendamentoController');

const routes = express.Router();

routes.get('/colaboradores', ColaboradorController.listaColaboradores);
routes.get('/colaboradores/:id', ColaboradorController.colaboradorPorId);
routes.post('/colaboradores', ColaboradorController.cadastraColaborador);
routes.get('/colabdata', ColaboradorController.colaboradoresPorData);

routes.get('/agendamentos', AgendamentoController.listaAgendamentos);
routes.get('/agendamentos/:id', AgendamentoController.listaAgendamentoPorIdDoColaborador);
routes.post('/agendamentos', AgendamentoController.cadastraAgendamento);


module.exports = routes;