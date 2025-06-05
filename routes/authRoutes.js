const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../utils/validator");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

module.exports = router;
