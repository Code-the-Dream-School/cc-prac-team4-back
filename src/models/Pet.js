const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, 'Please provide pet name'],
    },
    petType: {
      type: String,
      required: [true, 'Please provide pet type'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    image: {
      type: [],
      default: undefined,
    },
    breed: {
      type: String,
    },
    age: {
      type: String,
    },
    size: {
      type: String,
    },
    gender: {
      type: String,
    },
    goodWith: {
      type: {},
      default: undefined,
    },
    coatLength: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    careAndBehaviour: {
      type: {},
      default: undefined,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetSchema);
