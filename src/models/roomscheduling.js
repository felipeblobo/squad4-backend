'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomScheduling extends Model {
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
  RoomScheduling.init({
    date: DataTypes.DATEONLY,
    time_zone: DataTypes.INTEGER,
    room: DataTypes.STRING,
    office: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoomScheduling',
    freezeTableName: true
  });
  return RoomScheduling;
};