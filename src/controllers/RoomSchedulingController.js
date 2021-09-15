const database = require("../models");
const { Op, DataTypes } = require("sequelize");

class RoomSchedulingController {

  static async listRoomScheduling(req, res) {
    try {
      const allRoomScheduling = await database.RoomScheduling.findAll();
      res.status(200).json(allRoomScheduling);
    } catch (error) {
      return res.status(404).json({mensagem: "Não foi possível listar os agendamentos para reuniões."});
    }
  }


  static async getRoomBydId(req, res) {
    const { id } = req.params;
    try {
      const room = await database.RoomScheduling.findOne({where: { id: Number(id) }})
      res.status(200).json(room);
    } catch (error) {
      res.status(404).json({ mensagem: "Não foi possível obter este agendamento." })
    }
  }


  static async getRoomByUserId(req, res) {
    const { id } = req.params;
    try {
      const room = await database.RoomScheduling.findAll({where: { user_id: Number(id) }})
      res.status(200).json(room);
    } catch (error) {
      res.status(404).json({ mensagem: "Não foi possível obter este agendamento." })
    }

  
  }

  static async registerOfficeScheduling(req, res) {
    const newScheduling = req.body;
    const dateScheduling = req.body.date;
    const office = req.body.office;
    const user = req.body.user_id;
    const room = req.body.room;
    const time_zone = req.body.time_zone;

    const BusySchedule = await database.RoomScheduling.findAll({
      where: {
        [Op.and]: [
          { date: dateScheduling },
          { user_id: user }
        ]
      }
    });

    if (BusySchedule.length > 0) {
      return res.status(400).json({mensagem: "O usuário já agendou para data solicitada."})
    }

    const BusyRoom = await database.RoomScheduling.findAll({
      where: {
        [Op.and]: [
          { date: dateScheduling },
          { time_zone: time_zone},
          { room: room },
          { office: office }
        ]
      }
    });

    if (BusyRoom.length > 0) {
      return res.status(400).json({mensagem: "Esta sala já foi reservada para este horário."})
    }

    const schedulingOnCertainDate =
    await database.RoomScheduling.findAndCountAll({
      where: {
        [Op.and]: [
          { date: dateScheduling },
          { office: office }
        ]        
      }
    });

    const officeCapacity = office === "Santos" ? 5 : 4;

    if (schedulingOnCertainDate.count <= officeCapacity) {
      try {
        const scheduling = await database.RoomScheduling.create(newScheduling);
        return res.status(201).json(scheduling);
      } catch (error) {
        return res.status(500).json({mensagem: "Não foi possível realizar este agendamento."});
      }
    } else {
      return res.status(500).json({mensagem: "Não há mais salas de reunião disponíveis para o dia solicitado."})
    }   
  }

  static async updateRoomScheduling(req, res) {
    const requestUpdateScheduling = req.body;
    const { id } = req.params;
    try {
      await database.RoomScheduling.update(requestUpdateScheduling, {
        where: { id: Number(id) },
      });
      const schedulingUpdated = await database.RoomScheduling.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(schedulingUpdated);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível atualizar este agendamento."});
    }
  }

  static async deleteRoomScheduling (req, res) {
    
    const { id } = req.params;
    try {
      await database.RoomScheduling.destroy({
        where: { id: Number(id) },
      });
      return res.status(204).json({ mensagem: `O agendamento com o id:${id} foi deletado.`});
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível deletar este agendamento."});
    }
    }

    static async roomSchedulingByDate(req, res) {
      const data = req.params.data;
      const timezone = req.params.timezone;
      try {
        const schedulingOnCertainDate =
          await database.RoomScheduling.findAndCountAll({
            where: {
              [Op.and]: [
                { date: data },
                { time_zone: timezone }
              ]        
            }
          });
        return res.status(200).json(schedulingOnCertainDate);
      } catch (error) {
        return res.status(404).json({messagem: "Não foi possível obter as reuniões para data solicitada."});
      }
    }


}

module.exports = RoomSchedulingController;