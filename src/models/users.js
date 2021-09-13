"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Scheduling, {
        foreignKey: "user_id",
      });
      this.hasMany(models.RoomScheduling, {
        foreignKey: "user_id",
      });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Email de tipo inválido!"  
          }
        }
      },
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      isAdmin: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      squad: DataTypes.STRING,
      origin_office: DataTypes.STRING,
      vaccine_status: DataTypes.BOOLEAN,
      pwd: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    },
  );
  return Users;
};
