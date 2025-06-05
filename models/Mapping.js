const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Mapping = sequelize.define("Mapping", {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Mapping;
