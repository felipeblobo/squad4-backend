const express = require('express');
const ColaboradorController = require('./controllers/ColaboradorController');
const AgendamentoController = require('./controllers/AgendamentoController');

const routes = express.Router();

routes.get('/colaboradores', ColaboradorController.listaColaboradores);
routes.get('/colaboradores/:id', ColaboradorController.colaboradorPorId);
routes.post('/colaboradores', ColaboradorController.cadastraColaborador);

routes.get('/agendamentos', AgendamentoController.listaAgendamentos);
routes.get('/agendamentos/colaborador/:id', AgendamentoController.listaAgendamentosPorIdDoColaborador);
routes.get('/agendamentos/data', AgendamentoController.agendamentosPorData);
routes.post('/agendamentos', AgendamentoController.cadastraAgendamento);
routes.put('/agendamentos/:id', AgendamentoController.atualizaAgendamento);
routes.delete('/agendamentos/:id', AgendamentoController.deletaAgendamento);

module.exports = routes;