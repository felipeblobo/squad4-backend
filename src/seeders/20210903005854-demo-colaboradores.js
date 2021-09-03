"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Colaboradores",
      [
        {
          name: "João Ninguém",
          email: "joao@gmail.com",
          password: "senha",
          origin_office: "Santos",
          vaccine_status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ana Ana",
          email: "ana@gmail.com",
          password: "senha",
          origin_office: "São Paulo",
          vaccine_status: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Colaboradores", null, {});
  },
};
