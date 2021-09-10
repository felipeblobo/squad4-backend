const database = require("../models");
const { Op } = require("sequelize");

class RoomSchedulingController {

  static async listRoomScheduling(req, res) {
    try {
      const allRoomScheduling = await database.RoomScheduling.findAll();
      res.status(200).json(allRoomScheduling);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível listar os agendamentos para reuniões."});
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
      return res.status(500).json({mensagem: "O usuário já agendou para data solicitada."})
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
      return res.status(500).json({mensagem: "Esta sala já foi reservada para este horário."})
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

}

module.exports = RoomSchedulingController;