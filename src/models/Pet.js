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
      enum: ['Cat', 'Dog', 'Other'],
      default: 'Cat',
      required: [true, 'Please provide type'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [2000, 'Description can not be more than 2000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    breed: {
      type: String,
      enum: [
        'Domestic Short Hair',
        'Domestic Medium Hair',
        'Domestic Long Hair',
      ],
      default: 'Domestic Short Hair',
    },
    age: {
      type: String,
      enum: ['Kitten', 'Young', 'Adult', 'Senior'],
      default: 'Adult',
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large'],
      default: 'Medium',
    },
    gender: {
      type: String,
      enum: ['Female', 'Male'],
      default: 'Female',
    },
    goodWith: {
      type: String,
      enum: ['Kids', 'Dogs', 'Other Cats'],
      default: 'Kids',
    },
    coatLength: {
      type: String,
      enum: ['Short', 'Medium', 'Long'],
      default: 'Short',
    },
    color: {
      type: String,
      enum: ['Tabby', 'Gray', 'Black', 'White', 'Orange', 'Tuxedo'],
      default: 'Tabby',
    },
    careAndBehaviour: {
      type: String,
      enum: ['House-trained', 'Declawed', 'Special Needs'],
      default: 'House-trained',
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
