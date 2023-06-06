const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, 'Please provide pet name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    petType: {
      type: String,
      required: [true, 'Please provide pet type'],
      default: 'Cat',
      maxlength: [100, 'Type can not be more than 100 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, 'Please provide pet description'],
      maxlength: [2000, 'Description can not be more than 2000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    breed: {
      type: String,
      maxlength: [100, 'Breed can not be more than 100 characters'],
    },
    age: {
      type: String,
      default: 'Adult',
      maxlength: [100, 'Age can not be more than 100 characters'],
    },
    size: {
      type: String,
      default: 'Medium',
      maxlength: [100, 'size can not be more than 100 characters'],
    },
    gender: {
      type: String,
      default: 'Female',
      maxlength: [10, 'Gender can not be more than 100 characters'],
    },
    goodWith: {
      type: String,
      default: 'Kids',
      maxlength: [100, 'Good with can not be more than 100 characters'],
    },
    coatLength: {
      type: String,
      default: 'Short',
      maxlength: [100, 'Coat length can not be more than 100 characters'],
    },
    color: {
      type: String,
      maxlength: [100, 'Color can not be more than 100 characters'],
    },
    careAndBehaviour: {
      type: String,
      default: 'House-trained',
      maxlength: [100, 'Care can not be more than 100 characters'],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'userModel',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetSchema);
