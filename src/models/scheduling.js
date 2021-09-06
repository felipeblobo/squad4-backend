'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scheduling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'user_id'
      });
    }
  };
  Scheduling.init({
    date: DataTypes.DATEONLY,
    workstation: DataTypes.STRING,
    office: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Scheduling',
  });
  return Scheduling;
};