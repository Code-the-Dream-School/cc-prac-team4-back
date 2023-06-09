const jwt = require('jsonwebtoken');
const { UnauthenticatedError, UnauthorizedError } = require('../errors');

const isAuth = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  try {
    const isTokenValid = ({ token }) =>
      jwt.verify(token, process.env.JWT_SECRET);

    const { name, userId, role } = isTokenValid({ token });

    req.user = { name, userId, role };
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new UnauthorizedError('Unauthorized to access this route');
  }
  next();
};

module.exports = { isAuth, isAdmin };
