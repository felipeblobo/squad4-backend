const database = require('../models');

class ColaboradorController {
  
    static async listarColaboradores(req, res) {
      try {
        const todosOsColaboradores = await database.Colaboradores.findAll();
        return res.status(200).json(todosOsColaboradores);
      } catch (error) {
        return res.status(500).json(error.message)
      }      
    }
}

module.exports = ColaboradorController;