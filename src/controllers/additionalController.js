const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const jwt = require('jsonwebtoken');
const sendEmail = require('../middleware/sendEmail.js');

const forgotPasswordController = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(`No user with email ${req.body.email}`);
  }

  const secret = process.env.JWT_SECRET + user.password;

  const newToken = jwt.sign({ userId: this._id, name: this.name }, secret, {
    expiresIn: 60 * 15,
  });

  const message = `<h3> <a href=${process.env.BASE_URL}/password/reset/${user._id}/${newToken}>Reset Password Link</a> </h3> <br> <p>Here is the link to
   reset your 
  password. If you have not requested this email, please ignore it.</P>`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Reset`,
      html: message,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Email with reset password link sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const getResetPasswordController = async (req, res, next) => {
  const { id, token } = req.params;

  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
    return;
  } else {
    try {
      const secret = process.env.JWT_SECRET + user.password;
      const payload = jwt.verify(token, secret);
      res.status(StatusCodes.OK).json({message: `Create new password for ${user.email}`});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
};

const useResetPasswordController = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  } else {
    try {
      const secret = process.env.JWT_SECRET + user.password;
      const payload = jwt.verify(token, secret);

      if (newPassword !== confirmPassword) {
        throw new UnauthenticatedError('Password does not match');
      }
      user.password = newPassword;
      await user.save();
      res
        .status(StatusCodes.OK)
        .json({ msg: 'Password was successfully updated' });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
};

module.exports = {
  forgotPasswordController,
  getResetPasswordController,
  useResetPasswordController,
};
