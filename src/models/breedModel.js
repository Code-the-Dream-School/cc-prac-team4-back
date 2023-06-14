const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema(
  {
    petType: {
        type: String,
        default: null
      },
    breedName: {
      type: String,
      default: null,
    },    
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Breeds', breedSchema);
