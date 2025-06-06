const Mapping = require("../models/Mapping");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    // Check if patient exists
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Check if patient is already assigned to a doctor
    const existingPatientMapping = await Mapping.findOne({
      where: { patientId },
    });
    if (existingPatientMapping) {
      return res.status(400).json({
        msg: "Patient is already assigned to a doctor",
        mapping: existingPatientMapping,
      });
    }

    // Check if doctor is already assigned to a patient
    const existingDoctorMapping = await Mapping.findOne({
      where: { doctorId },
    });
    if (existingDoctorMapping) {
      return res.status(400).json({
        msg: "Doctor is already assigned to a patient",
        mapping: existingDoctorMapping,
      });
    }

    // Create the mapping
    const mapping = await Mapping.create({ patientId, doctorId });

    res.status(201).json({ msg: "Doctor assigned to patient", mapping });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "age", "gender"],
        },
        {
          model: Doctor,
          as: "doctor",
          attributes: ["id", "name", "specialization"],
        },
      ],
    });

    res.status(200).json(mappings);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

exports.getDoctorsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({
        message: "Please Provide Patient ID",
      });
    }

    // Fetch mappings for a given patient and include doctor & patient details
    const mappings = await Mapping.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          as: "doctor",
          attributes: ["id", "name", "specialization"],
        },
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "age", "gender"],
        },
      ],
    });

    if (!mappings.length) {
      return res.status(404).json({
        message: "No doctor found assigned to this patient",
      });
    }

    res.status(200).json(mappings);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

exports.removeDoctorFromPatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        message: "Please Provide Id",
      });
    }

    const mapping = await Mapping.findByPk(id);
    if (!mapping) return res.status(404).json({ msg: "Mapping not found" });

    await mapping.destroy();
    res.status(200).json({ msg: "Doctor removed from patient" });
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};
