const express = require("express");
const router = express.Router();
const mappingController = require("../controllers/mappingController");
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, mappingController.assignDoctor);
router.get("/", authenticateUser, mappingController.getAllMappings);
router.get(
  "/:patientId",
  authenticateUser,
  mappingController.getDoctorsForPatient
);
router.delete(
  "/:id",
  authenticateUser,
  mappingController.removeDoctorFromPatient
);

module.exports = router;
