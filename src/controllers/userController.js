const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');

const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');
  const isPasswordCorrect = await user.comparePassword(req.body.oldPassword);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  } else {
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Password');
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      throw new UnauthenticatedError('Password does not match');
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

  if (name === '') {
    throw new BadRequestError('Name field cannot be empty');
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
  const user = await User.findById(req.body.id);
  if (!user) {
    throw new NotFoundError(`No user with id ${req.body.id}`);
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
