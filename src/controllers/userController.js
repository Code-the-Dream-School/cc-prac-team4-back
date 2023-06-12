const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');

const getUserDetails = async (req, res, next) => {
  const user = await User.findById({ _id: req.user.userId }).select(
    '-password'
  );
  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }

  res.status(StatusCodes.OK).json({ user });
};

const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  console.log(oldPassword, newPassword);
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values');
  }
  const user = await User.findById({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Password was successfully updated' });
};

const updateProfile = async (req, res, next) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError('Please provide name and email');
  }
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .cookie('token', token, {
      expires: new Date(Date.now() + 60 * 24 * 3600000),
      httpOnly: true,
      signed: true,
    })
    .json({ msg: 'Success! Profile Updated.' });
};

//admin cotrollers

const getAllUsers = async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
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
    .json({ msg: ' The user was successfully deleted' });
};

module.exports = {
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
