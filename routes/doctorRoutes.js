const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, doctorController.createDoctor);
router.get("/", authenticateUser, doctorController.getAllDoctors);
router.get("/:id", authenticateUser, doctorController.getDoctorById);
router.put("/:id", authenticateUser, doctorController.updateDoctor);
router.delete("/:id", authenticateUser, doctorController.deleteDoctor);

module.exports = router;
