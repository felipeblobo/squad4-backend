"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin_office: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vaccine_status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      squad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pwd: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
