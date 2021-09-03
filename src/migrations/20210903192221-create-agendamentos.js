'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colaborador_id : {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Colaboradores',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      workstation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      office: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Agendamentos');
  }
};