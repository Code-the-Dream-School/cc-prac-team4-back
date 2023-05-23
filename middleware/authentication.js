const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

//authentication

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Token");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findById(payload.id).select("-password");
    req.user = user;

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Token is invalid");
  }
};

const authorizeRoles = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.role !== "admin") {
    throw new UnauthenticatedError(
      `Role: ${req.user.role} is not allowed to access this resource`
    );
  }
  next();
};

module.exports = { auth, authorizeRoles };
