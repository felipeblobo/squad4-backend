const database = require("../models");
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");

class ColaboradorController {
  static async listaColaboradores(req, res) {
    try {
      const todosOsColaboradores = await database.Colaboradores.findAll();
      return res.status(200).json(todosOsColaboradores);
    } catch (error) {
      return res.status(500).json("Não foi possível listar os colaboradores.");
    }
  }

  static async colaboradoresPorData(req, res) {
    const dateToQuery = '2021-09-03';
    try {
      const colaboradoresAgendados =
        await database.Colaboradores.findAndCountAll({
          where: sequelize.where(
            sequelize.fn("date", sequelize.col("createdAt")),
            "=",
            dateToQuery
          ),
        });
      return res.status(200).json(colaboradoresAgendados);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async colaboradorPorId(req, res) {
    const { id } = req.params;
    try {
      const colaborador = await database.Colaboradores.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(colaborador);
    } catch (error) {
      return res.status(500).json({mensagem: "Não foi possível localizar este colaborador."});
    }
  }

  static async cadastraColaborador(req, res) {
    const novoColaborador = req.body;
    const senha = req.body.password;
    const senhaElaborada = await bcrypt.hash(senha, 10);
    
      try {
        const colaboradorComSenhaEncriptada = {
          ...novoColaborador,
          password: senhaElaborada,
        };
        const colaborador = await database.Colaboradores.create(
          colaboradorComSenhaEncriptada
        );
        return res.status(201).json(colaborador);
      } catch (error) {
        return res.status(500).json({mensagem: "Não foi possível cadastrar este colaborador."});
      
    }
  }
}

module.exports = ColaboradorController;
