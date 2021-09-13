const database = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { RegisterConfirmation } = require("../utils/Emails");

function addressGeneration(route, id) {
  const baseURL = "http://localhost:8080";
  return `${baseURL}${route}${id}`;
}

class UserController {
  static async listUsers(req, res) {
    try {
      const allUsers = await database.Users.findAll({
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json(allUsers);
    } catch (error) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível listar os colaboradores." });
    }
  }

  static async userById(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({
        attributes: { exclude: ["password"] },
        where: { id: Number(id) },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível localizar este colaborador." });
    }
  }

  static async userRegistration(req, res) {

     // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para cadastro de colaborador.'
        /*         
            #swagger.parameters['name'] = {
               description: 'Nome do colaborador.',
               type: 'string',
                required: true
        }                 
        #swagger.parameters['email'] = { 
          description: 'Email do usuário.',
          required: true,
          type: 'string',
        }
        
          #swagger.parameters['password'] = {
               description: 'Nome do colaborador.',
                required: true,
               type: 'string',
        } 
            #swagger.parameters['origin_office'] = {
               description: 'Escritório de preferência do colaborador.',
               type: 'string',
              required: true
        } 
           #swagger.parameters['vaccine_status'] = {
               description: 'Status de vacinação do colaborador',
               type: 'boolean'
        } 
        
           #swagger.parameters['role'] = {
               description: 'Cargo do colaborador',
               type: 'boolean'
        }         
        */

    const newUser = req.body;
    const password = req.body.password;
    const email = req.body.email;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const emailAlreadyExists = await database.Users.findOne({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      return res
        .status(404)
        .json({ mensagem: "Este email já existe em nosso cadastro." });
    }

    try {
      const userWithEncryptedPassword = {
        ...newUser,
        password: encryptedPassword,
      };
      const user = await database.Users.create(userWithEncryptedPassword);
      const address = addressGeneration("/colaboradores/verificacao/", user.id);
      const emailVerification = new RegisterConfirmation(user, address);
      console.log(emailVerification);
      emailVerification.sendEmail().catch(console.log);
      return res
        .status(201)
        .json({ messagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível cadastrar este colaborador." });
    }
  }

  static async modifyUserWithVerifiedEmail(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({
        attributes: { exclude: ["password"] },
        where: { id: Number(id) },
      });
      await database.Users.update(
        { ...user, isVerified: true },
        {
          where: { id: Number(id) },
        }
      );
      const userUpdated = await database.Users.findOne({
        where: { id: Number(user.id) },
      });
      return res.status(200).json(userUpdated);
    } catch (error) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível verificar este usuário." });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
      /*
      #swagger.description = 'Endpoint para autenticação do colaborador.'
      */

      /*
    #swagger.parameters['email'] = {
    description: 'E-mail do colaborador.',
      type: 'string',
      required: true,
      example: 'user@fcamara.com',
    }

    #swagger.parameters['password'] = {
      description: 'Senha do colaborador.',
      type: 'string',
      required: true,
      example: '5g6sdk7',
      }
    */

    try {
      const returningUser = await database.Users.findOne({
        attributes: {
          exclude: ["password", "isAdmin", "createdAt", "updatedAt"],
        },
        where: { email },
      });

      const user = await database.Users.findOne({
        where: { email },
      });

      if (user.isVerified === false) {
        return res
          .status(404)
          .json({
            mensagem: "Você não confirmou seu cadastro! Verifique seu email.",
          });
      }

      bcrypt.compare(password, user.dataValues.password, (err, data) => {
        if (err) throw err;

        if (data) {
          const token = jwt.sign(
            {
              id: user.dataValues.id,
              email: user.dataValues.email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "6h",
            }
          );
          return res.status(200).json({
            mensagem: "Login feito com sucesso",
            token,
            returningUser,
          });
        } else {
          return res
            .status(401)
            .json({ mensagem: "Senha ou login inválidos!" });
        }
      });
    } catch (error) {
      return res.status(401).json({ mensagem: "Senha ou login inválidos!" });
    }
  }
}

module.exports = UserController;
