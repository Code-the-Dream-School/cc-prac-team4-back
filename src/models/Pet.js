const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, 'Please provide pet name'],
      //maxlength: [100, 'Name can not be more than 100 characters'],
    },
    petType: {
      type: String,
      //required: [true, 'Please provide pet type'],
      //default: 'Cat',
      //maxlength: [100, 'Type can not be more than 100 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      // required: [true, 'Please provide pet description'],
      maxlength: [2000, 'Description can not be more than 2000 characters'],
    },
    image: {
      type: [],
      //default: '/uploads/example.jpeg',
      default: undefined,
    },
    breed: {
      type: String,
      //maxlength: [100, 'Breed can not be more than 100 characters'],
    },
    age: {
      type: String,
      //default: 'Adult',
      //maxlength: [100, 'Age can not be more than 100 characters'],
    },
    size: {
      type: String,
      //default: 'Medium',
      //maxlength: [100, 'size can not be more than 100 characters'],
    },
    gender: {
      type: String,
      //default: 'Female',
      //maxlength: [10, 'Gender can not be more than 100 characters'],
    },
    goodWith: {
      //type: String,
      type: [],
      //default: 'Kids',
      default: undefined,
      //maxlength: [100, 'Good with can not be more than 100 characters'],
    },
    coatLength: {
      type: String,
      default: 'Short',
      maxlength: [100, 'Coat length can not be more than 100 characters'],
    },
    color: {
      type: String,
      maxlength: [500, 'Color can not be more than 500 characters'],
    },
    careAndBehaviour: {
      //type: String,
      type: [],
      //default: 'House-trained',
      default: undefined,
      //maxlength: [500, 'Care can not be more than 500 characters'],
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
