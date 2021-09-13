const database = require("../models");
const { Op } = require("sequelize");

class SchedulingController {
  static async listScheduling(req, res) {
    try {
      const allScheduling = await database.Scheduling.findAll();
      res.status(200).json(allScheduling);
    } catch (error) {
      return res.status(404).json({mensagem: "Não foi possível listar os agendamentos."});
    }
  }

  static async listSchedulingByUserId(req, res) {
    const { id } = req.params;
    try {
      const scheduling = await database.Scheduling.findAll({
        where: { user_id: Number(id) },
      });
      return res.status(200).json(scheduling);
    } catch (error) {
      return res.status(404).json({mensagem: "Não foi possível listar os agendamentos deste colaborador."});
    }
  }

  static async listSchedulingById(req, res) {
    const { id } = req.params;
    try {
      const scheduling = await database.Scheduling.findOne({
        where: {id: Number(id)}
      });
      res.status(200).json(scheduling);
    } catch (error) {
      res.status(404).json({ mensagem: "Não foi possível localizar este agendamento."})
    }
  }

  static async registerScheduling(req, res) {
    const newScheduling = req.body;
    const dateScheduling = req.body.date;
    const office = req.body.office;
    const user = req.body.user_id;
    const workstation = req.body.workstation;

    const BusySchedule = await database.Scheduling.findAll({
      where: {
        [Op.and]: [
          { date: dateScheduling },
          { user_id: user }
        ]
      }
    });

    if (BusySchedule.length > 0) {
      return res.status(404).json({mensagem: "O usuário já agendou para data solicitada."})
    }

    const BusyWorkstation = await database.Scheduling.findAll({
      where: {
        [Op.and]: [
          { date: dateScheduling },
          { workstation: workstation },
          { office: office }
        ]
      }
    });

    if (BusyWorkstation.length > 0) {
      return res.status(404).json({mensagem: "Esta estação de trabalho já foi reservada."})
    }

    const schedulingOnCertainDate =
    await database.Scheduling.findAndCountAll({
      where: {
        [Op.and]: [
          { date: dateScheduling },
          { office: office }
        ]        
      }
    });

    const officeCapacity = office === "Santos" ? 40 : 240;

    if (schedulingOnCertainDate.count <= officeCapacity) {
      try {
        const scheduling = await database.Scheduling.create(newScheduling);
        return res.status(201).json(scheduling);
      } catch (error) {
        return res.status(404).json({mensagem: "Não foi possível realizar este agendamento."});
      }
    } else {
      return res.status(404).json({mensagem: "Não há mais vagas disponíveis para o dia solicitado."})
    }   
  }

  static async updateScheduling(req, res) {
    const requestUpdateScheduling = req.body;
    const { id } = req.params;
    try {
      await database.Scheduling.update(requestUpdateScheduling, {
        where: { id: Number(id) },
      });
      const schedulingUpdated = await database.Scheduling.findOne({
        where: { user_id: Number(id) },
      });
      return res.status(200).json(schedulingUpdated);
    } catch (error) {
      return res.status(404).json({mensagem: "Não foi possível atualizar este agendamento."});
    }
  }


  static async deleteScheduling (req, res) {
    
    const { id } = req.params;
    try {
      await database.Scheduling.destroy({
        where: { id: Number(id) },
      });
      return res.status(200).json({ mensagem: `O agendamento com o id:${id} foi deletado.`});
    } catch (error) {
      return res.status(404).json({mensagem: "Não foi possível deletar este agendamento."});
    }
    }

    static async schedulingByDate(req, res) {
      const data = req.params.data;
      console.log(data)
      try {
        const schedulingOnCertainDate =
          await database.Scheduling.findAndCountAll({
            where: {
              date: {
                [Op.eq]: data
              }
            }
          });
        return res.status(200).json(schedulingOnCertainDate);
      } catch (error) {
        return res.status(404).json({messagem: "Não foi possível obter os agendamentos para data solicitada."});
      }
    }



  }

module.exports = SchedulingController;
