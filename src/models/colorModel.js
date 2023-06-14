const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema(
  {
    petType: {
      type: String,
      default: null,
    },
    colorName: {
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

module.exports = mongoose.model('Colors', colorSchema);
