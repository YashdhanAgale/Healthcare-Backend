const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (name.length === 0 || specialization.length === 0) {
      return res.status(401).json({
        message: "cannot insert empty strings please add valid details",
      });
    }

    const doctor = await Doctor.create({ name, specialization });
    res.status(201).json({ msg: "Doctor added", doctor });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (name.length === 0 || specialization.length === 0) {
      return res.status(401).json({
        message:
          "Cant update empty strings please provide proper Name and Specialization ",
      });
    }
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    await doctor.update({ name, specialization });
    res.status(200).json({ msg: "Updated", doctor });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    await doctor.destroy();
    res.status(200).json({ msg: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
