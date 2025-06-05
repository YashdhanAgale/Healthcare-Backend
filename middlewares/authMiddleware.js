const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "No token. Access denied!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user.id
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid!" });
  }
};

module.exports = authenticateUser;
