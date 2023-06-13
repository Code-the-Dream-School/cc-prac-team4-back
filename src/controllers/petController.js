const Pet = require('../models/Pet');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const createPet = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const pet = await Pet.create(req.body);
  res.status(StatusCodes.CREATED).json({ pet });
};

const getAllPets = async (req, res) => {
  const pets = await Pet.find({});

  res.status(StatusCodes.OK).json({ pets, count: pets.length });
};

const getSinglePet = async (req, res) => {
  const { id: petId } = req.params;

  const pet = await Pet.findById({ _id: petId });

  if (!pet) {
    throw NotFoundError(`No pet with id : ${petId}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

const updatePet = async (req, res) => {
  const { id: petId } = req.params;

  const pet = await Pet.findByIdAndUpdate({ _id: petId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pet) {
    throw NotFoundError(`No pet with id : ${petId}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};
const deletePet = async (req, res) => {
  const { id: petId } = req.params;
  const pet = await Pet.findByIdAndRemove({ _id: petId });
  if (!pet) {
    throw NotFoundError(`No pet with id : ${petId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! Pet Removed' });
};

const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createPet,
  getAllPets,
  getSinglePet,
  updatePet,
  deletePet,
  uploadImage,
};
