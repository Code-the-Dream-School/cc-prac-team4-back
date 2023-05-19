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
const sendToken = require("../../middleware/jwtToken");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
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
    .json({ user: { name: user.name }, token, userId: user._id });
};

const logout = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(StatusCodes.OK).json({ success: true, message: "Logged Out" });
};

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

const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");
  const isPasswordCorrect = await user.comparePassword(req.body.oldPassword);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  } else {
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Password");
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      throw new UnauthenticatedError("Password does not match");
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({
      msg: `Password for user ${user.name} was successfully updated `,
    });
  }
};

const updateProfile = async (req, res, next) => {
  const {
    body: { name, userImage },
    params: { id: userId },
  } = req;

  if (name === "") {
    throw new BadRequestError("Name field cannot be empty");
  }
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({
    msg: `User profile for user with id ${userId} was sucessfully updated`,
  });
};

//admin cotrollers

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.body.userId}`);
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

const updateUserRole = async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.body.userId, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  } else {
    res.status(StatusCodes.OK).json({
      msg: `The role of ${user.name} was successfully changed to ${user.role}`,
    });
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.body.userId);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.body.userId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: " The user was successfully deleted" });
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPasswordController,
  resetPasswordController,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
