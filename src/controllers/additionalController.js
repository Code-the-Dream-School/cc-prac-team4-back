const User = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");
const {
  forgotPassword,
  resetPassword,
} = require("../../middleware/forgotpassword");

//add

const forgotPasswordController = async (req, res, next) => {
  const forgotPaswordService = await forgotPassword(req.body.email);
  return res.json(forgotPaswordService);
};

const resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

module.exports = {
  forgotPasswordController,
  resetPasswordController,
};
