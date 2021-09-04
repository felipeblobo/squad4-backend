const database = require("../models");

class AgendamentoController {
  static async listaAgendamentos(req, res) {
    try {
      const todosOsAgendamentos = await database.Agendamentos.findAll();
      res.status(200).json(todosOsAgendamentos);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível listar os agendamentos."});
    }
  }

  static async listaAgendamentosPorIdDoColaborador(req, res) {
    const { id } = req.params;
    try {
      const agendamentos = await database.Agendamentos.findAll({
        where: { colaborador_id: Number(id) },
      });
      return res.status(200).json(agendamentos);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível listar os agendamentos deste colaborador."});
    }
  }

  static async cadastraAgendamento(req, res) {
    const novoAgendamento = req.body;
    try {
      const agendamento = await database.Agendamentos.create(novoAgendamento);
      return res.status(201).json(agendamento);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível realizar este agendamento."});
    }
  }

  static async atualizaAgendamento(req, res) {
    const pedidoDeAlteracaoDoAgendamento = req.body;
    const { id } = req.params;
    try {
      await database.Agendamentos.update(pedidoDeAlteracaoDoAgendamento, {
        where: { id: Number(id) },
      });
      const agendamentoAtualizado = await database.Agendamentos.findOne({
        where: { colaborador_id: Number(id) },
      });
      return res.status(200).json(agendamentoAtualizado);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível atualizar este agendamento."});
    }
  }


  static async deletaAgendamento(req, res) {
    const { id } = req.params;
    try {
      await database.Agendamentos.destroy({
        where: { id: Number(id) },
      });
      return res.status(200).json({ mensagem: `O agendamento com o id:${id} foi deletado.`});
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível deletar este agendamento."});
    }
    }
  }

module.exports = AgendamentoController;
