const database = require('../models');

class AgendamentoController {

    static async listaAgendamentos(req, res) {
     
      try {
        const todosOsAgendamentos = await database.Agendamentos.findAll();
        res.status(200).json(todosOsAgendamentos);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async listaAgendamentoPorIdDoColaborador(req, res) {
      const { id } = req.params;
      try {
        const agendamento = await database.Agendamentos.findAll({
          where: { colaborador_id: Number(id) },
        });
        return res.status(200).json(agendamento);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async cadastraAgendamento(req, res) {
        const novoAgendamento = req.body;
        try {
         const agendamento = await database.Agendamentos.create(novoAgendamento);
         return res.status(201).json(agendamento); 
        } catch (error) {
          return res.status(500).json(error.message);
        
      }
    }
}

module.exports = AgendamentoController;