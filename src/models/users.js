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
        foreignKey: "users_id",
      });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
