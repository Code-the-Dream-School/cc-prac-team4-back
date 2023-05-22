const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name cannot have more than 30 characters"],
      minLength: [4, "Name cannot have less than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "This email is already used"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password cannot have less than 8 characters"],
      maxLength: [20, "Password cannot have more than 20 characters"],
    },
    userImage: {
      type: String,
      default: "user.png",
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPassworExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPassworExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
