const Mapping = require("../models/Mapping");

exports.assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;
    const mapping = await Mapping.create({ patientId, doctorId });

    res.status(201).json({ msg: "Doctor assigned to patient", mapping });
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll();
    res.status(200).json(mappings);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

exports.getDoctorsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const mappings = await Mapping.findAll({ where: { patientId } });

    res.status(200).json(mappings);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

exports.removeDoctorFromPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const mapping = await Mapping.findByPk(id);
    if (!mapping) return res.status(404).json({ msg: "Mapping not found" });

    await mapping.destroy();
    res.status(200).json({ msg: "Doctor removed from patient" });
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};
