const { StatusCodes } = require('http-status-codes');
const Pet = require('../models/Pet');
const User = require('../models/userModel');
const mailer = require('../middleware/adoptionEmail');
const { NotFoundError } = require('../errors');
require('dotenv').config();

const adoptionController = async (req, res, next) => {
  const user = await User.findById({ _id: req.user.userId }).select(
    '-password'
  );
  if (!user) {
    throw new NotFoundError(`No user with id ${req.user.userId}`);
  }

  const { id: petId } = req.params;

  const pet = await Pet.findById({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id : ${petId}`);
  }

  try {
    await mailer({
      emailTo: [process.env.SHELTER_EMAIL, user.email],
      subject: 'Adoption Application Form',
      data: req.body,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Email with Adoption Application Form for adopting ${pet.petType} named ${pet.petName} sent to ${process.env.SHELTER_EMAIL} successfully. Copy of the Adoption Application Form was sent to ${user.email}.`,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Adoption Application Email was not sent`,
    });
    console.log(error);
    return next();
  }
};

module.exports = adoptionController;
