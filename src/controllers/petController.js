const Pet = require('../models/Pet');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');
const path = require('path');

const createPet = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const pet = await Pet.create(req.body);
  res.status(StatusCodes.CREATED).json({ pet });
};

const getAllPets = async (req, res) => {
  const {
    petType,
    breed,
    age,
    size,
    gender,
    goodWith,
    coatLength,
    color,
    careAndBehaviour,
    petName,
  } = req.query;
  const queryObject = {};

  if (petType) {
    queryObject.petType = petType;
  }

  if (breed) {
    queryObject.breed = breed;
  }

  if (age) {
    queryObject.age = age;
  }

  if (size) {
    queryObject.size = size;
  }

  if (gender) {
    queryObject.gender = gender;
  }

  if (goodWith === 'children') {
    queryObject['goodWith.children'] = true;
  }
  if (goodWith === 'dogs') {
    queryObject['goodWith.dogs'] = true;
  }
  if (goodWith === 'cats') {
    queryObject['goodWith.cats'] = true;
  }

  if (coatLength) {
    queryObject.coatLength = coatLength;
  }

  if (color) {
    queryObject.color = color;
  }

  if (careAndBehaviour === 'sprayed_neutered') {
    queryObject['careAndBehaviour.sprayed_neutered'] = true;
  }
  if (careAndBehaviour === 'house_trained') {
    queryObject['careAndBehaviour.house_trained'] = true;
  }
  if (careAndBehaviour === 'declawed') {
    queryObject['careAndBehaviour.declawed'] = true;
  }
  if (careAndBehaviour === 'special_needs') {
    queryObject['careAndBehaviour.special_needs'] = true;
  }
  if (careAndBehaviour === 'shots_current') {
    queryObject['careAndBehaviour.shots_current'] = true;
  }

  if (petName) {
    queryObject.petName = {
      $regex: petName,
      $options: 'i',
    };
  }

  const pets = await Pet.find(queryObject);

  res.status(StatusCodes.OK).json({ pets, count: pets.length });
};

const getSinglePet = async (req, res) => {
  const { id: petId } = req.params;

  const pet = await Pet.findById({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id : ${petId}`);
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
    throw new NotFoundError(`No pet with id : ${petId}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};
const deletePet = async (req, res) => {
  const { id: petId } = req.params;
  const pet = await Pet.findByIdAndRemove({ _id: petId });
  if (!pet) {
    throw new NotFoundError(`No pet with id : ${petId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! Pet Removed' });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File Uploaded');
  }
  const petImage = req.files.image;
  if (!petImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image');
  }

  const maxSize = 2048 * 2048;
  if (petImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller than 4 MB');
  }

  const imagePath = path.join(
    __dirname,
    '../../public/uploads/' + `${petImage.name}`
  );
  await petImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${petImage.name}` });
};

module.exports = {
  createPet,
  getAllPets,
  getSinglePet,
  updatePet,
  deletePet,
  uploadImage,
};
