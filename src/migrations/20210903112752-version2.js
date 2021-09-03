'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Colaboradores', 'createdAt', {
        type: Sequelize.DATEONLY
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('Colaboradores', 'createdAt')]);
  }
};
