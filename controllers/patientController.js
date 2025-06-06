const Patient = require("../models/Patient");

exports.createPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized: User not logged in" });
    }

    // Validate required fields
    if (!name || !age || !gender) {
      return res
        .status(400)
        .json({ msg: "Name, age, and gender are required" });
    }

    // Validate age
    if (isNaN(age) || age <= 0 || age > 120) {
      return res.status(400).json({ msg: "Please provide a valid age" });
    }

    // Validate gender
    const validGenders = ["Male", "Female", "Other"];
    if (!validGenders.includes(gender)) {
      return res
        .status(400)
        .json({ msg: "Gender must be Male, Female, or Other" });
    }

    // Create patient
    const patient = await Patient.create({
      name: name.trim(),
      age,
      gender,
      userId: req.user.id,
    });

    res.status(201).json({ msg: "Patient added successfully", patient });
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
    const { id } = req.params;

    // Check if ID param exists and is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({ msg: "Invalid patient ID" });
    }

    // Find patient
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // No fields provided
    if (!name && !age && !gender) {
      return res.status(400).json({
        msg: "At least one field (name, age, gender) is required to update",
      });
    }

    // Validate age if provided
    if (age !== undefined && (isNaN(age) || age <= 0 || age > 120)) {
      return res.status(400).json({ msg: "Please provide a valid age" });
    }

    // Validate gender if provided
    const validGenders = ["Male", "Female", "Other"];
    if (gender && !validGenders.includes(gender)) {
      return res
        .status(400)
        .json({ msg: "Gender must be Male, Female, or Other" });
    }

    // Update fields that were provided
    const updatedPatient = await patient.update({
      name: name !== undefined ? name.trim() : patient.name,
      age: age !== undefined ? age : patient.age,
      gender: gender !== undefined ? gender : patient.gender,
    });

    res
      .status(200)
      .json({ msg: "Patient updated successfully", patient: updatedPatient });
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
