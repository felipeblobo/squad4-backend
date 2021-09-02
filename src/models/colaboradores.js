'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colaboradores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Colaboradores.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    origin_office: DataTypes.STRING,
    vaccine_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Colaboradores',
  });
  return Colaboradores;
};