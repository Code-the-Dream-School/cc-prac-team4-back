const mongoose = require('mongoose');

//connect

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
