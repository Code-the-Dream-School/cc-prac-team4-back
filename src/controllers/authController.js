const User = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");
//auth

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .cookie("token", token, {
      expires: new Date(Date.now() + 60 * 24 * 3600000),
      httpOnly: true,
    })
    .json({ user: { name: user.name }, token, userId: user._id });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide Email and Password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Email");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .cookie("token", token, {
      expires: new Date(Date.now() + 60 * 24 * 3600000),
      httpOnly: true,
    })
    .json({ user: { name: user.name }, token, userId: user._id });
};

const logout = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(StatusCodes.OK).json({ success: true, message: "Logged Out" });
};

module.exports = {
  registerUser,
  loginUser,
  logout,
};
