const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, patientController.createPatient);
router.get("/", authenticateUser, patientController.getAllPatients);
router.get("/:id", authenticateUser, patientController.getPatientById);
router.put("/:id", authenticateUser, patientController.updatePatient);
router.delete("/:id", authenticateUser, patientController.deletePatient);

module.exports = router;
