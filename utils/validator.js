const { body } = require("express-validator");

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const validateRegister = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name must contain only letters and spaces"),
  body("email")
    .trim()
    .isEmail().withMessage("Valid email is required"),
  body("password")
    .matches(strongPasswordRegex)
    .withMessage(
      "Password must be at least 6 characters and contain uppercase, lowercase, number, and symbol"
    ),
];

const validateLogin = [
  body("email")
    .trim()
    .isEmail().withMessage("Valid email is required"),
  body("password")
    .notEmpty().withMessage("Password is required"),
];

module.exports = {
  validateRegister,
  validateLogin,
};
