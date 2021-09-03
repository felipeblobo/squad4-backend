'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Colaboradores, {
        foreignKey: 'colaborador_id'
      });
    }
  };
  Agendamentos.init({
    date: DataTypes.DATEONLY,
    workstation: DataTypes.STRING,
    office: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agendamentos',
  });
  return Agendamentos;
};