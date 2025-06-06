const sequelize = require("../config/db");
const User = require("./User");
const Patient = require("./Patient");
const Doctor = require("./Doctor");
const Mapping = require("./Mapping");

// Associations
User.hasMany(Patient, { foreignKey: "userId" });
Patient.belongsTo(User, { foreignKey: "userId" });

// Many-to-Many
Patient.belongsToMany(Doctor, {
  through: Mapping,
  foreignKey: "patientId",
  otherKey: "doctorId",
});

Doctor.belongsToMany(Patient, {
  through: Mapping,
  foreignKey: "doctorId",
  otherKey: "patientId",
});

// 👇 Needed for Mapping.findAll({ include: [...] })
Mapping.belongsTo(Patient, { as: "patient", foreignKey: "patientId" });
Mapping.belongsTo(Doctor, { as: "doctor", foreignKey: "doctorId" });

module.exports = {
  sequelize,
  User,
  Patient,
  Doctor,
  Mapping,
};
