const User = require('../models/userModel');
const Pet = require('../models/Pet');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const getFavorite = async (req, res) => {
  const { id: petId } = req.params;
  let isFavorite = false;
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id ${req.user.userId}`);
  }
  const { favorites } = user;
  if (!!favorites) {
    favorites.forEach((value) => {
      if (value.toString() === petId) {
        isFavorite = true;
      }
    });
  }

  res.status(StatusCodes.OK).json({ isFavorite });
};

const addFavorite = async (req, res) => {
  const { petId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $push: { favorites: petId },
    },
    {
      new: true,
    }
  ).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id ${req.user.userId}`);
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

const removeFavorite = async (req, res) => {
  const { petId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $pull: { favorites: petId },
    },
    {
      new: true,
    }
  ).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id ${req.user.userId}`);
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

const getAllFavorites = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id ${req.user.userId}`);
  }
  const { favorites } = user;
  if (!favorites) {
    res.status(StatusCodes.OK).json({ msg: 'No Favorite Pets' });
  } else {
    const pets = await Pet.find({ _id: { $in: favorites } });

    res.status(StatusCodes.OK).json({ pets, count: pets.length });
  }
};

module.exports = {
  getFavorite,
  addFavorite,
  removeFavorite,
  getAllFavorites,
};
