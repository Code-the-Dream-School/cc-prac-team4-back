const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const NotFoundError = require("../errors/not-found");
const sendToken = require("./jwtToken");

//forgot password

const forgotPassword = async (req, res, next) => {
  //const email = req.body.email;
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new NotFoundError("User does not exist");

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

  try {
    await sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.name,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next();
  }
  // return { link };
};

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new NotFoundError("Reset Password Token is invalid or has been expired")
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new NotFoundError("Password does not match"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const user = await User.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  sendToken();
  return { message: "Password reset was successful" };
};

module.exports = { forgotPassword, resetPassword };
