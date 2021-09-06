"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "João Ninguém",
          email: "joao@gmail.com",
          password: "senha",
          origin_office: "Santos",
          vaccine_status: true,
          pwd: "deficiente físico",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ana Ana",
          email: "ana@gmail.com",
          password: "senha",
          origin_office: "São Paulo",
          vaccine_status: false,
          pwd: "não",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
