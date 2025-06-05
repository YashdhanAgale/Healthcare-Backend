const Patient = require("../models/Patient");

exports.createPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const patient = await Patient.create({
      name,
      age,
      gender,
      userId: req.user.id,
    });

    res.status(201).json({ msg: "Patient added", patient });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    await patient.update({ name, age, gender });
    res.status(200).json({ msg: "Updated", patient });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    await patient.destroy();
    res.status(200).json({ msg: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
