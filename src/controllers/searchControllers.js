const { StatusCodes } = require('http-status-codes');
const Pet = require('../models/Pet');

const searchCatBreeds = async (req, res) => {
  const cats = await Pet.find({ petType: 'Cat' }).distinct('breed');
  res.status(StatusCodes.OK).json({ cats, count: cats.length });
};

const searchDogBreeds = async (req, res) => {
  const dogs = await Pet.find({ petType: 'Dog' }).distinct('breed');
  res.status(StatusCodes.OK).json({ dogs, count: dogs.length });
};

const searchCatColors = async (req, res) => {
  const cats = await Pet.find({ petType: 'Cat' }).distinct('color');
  res.status(StatusCodes.OK).json({ cats, count: cats.length });
};

const searchDogColors = async (req, res) => {
  const dogs = await Pet.find({ petType: 'Dog' }).distinct('color');
  res.status(StatusCodes.OK).json({ dogs, count: dogs.length });
};

module.exports = {
  searchCatBreeds,
  searchDogBreeds,
  searchCatColors,
  searchDogColors,
};
