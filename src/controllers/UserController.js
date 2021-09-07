const database = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  static async listUsers(req, res) {
    try {
      const allUsers = await database.Users.findAll();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível listar os colaboradores." });
    }
  }

  static async userById(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível localizar este colaborador." });
    }
  }

  static async userRegistration(req, res) {
    const newUser = req.body;
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
      const userWithEncryptedPassword = {
        ...newUser,
        password: encryptedPassword,
      };
      const user = await database.Users.create(userWithEncryptedPassword);
      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível cadastrar este colaborador." });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await database.Users.findOne({
        where: { email }
      });
      bcrypt.compare(password,user.dataValues.password, (err, data) => {

        if (err) throw err;

        if (data) {
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ mensagem: "Senha ou login inválidos!"  })
        }})
    } catch (error) {
      return res
        .status(401)
        .json({ mensagem: "Senha ou login inválidos!" });
    }
  }
}

module.exports = UserController;
