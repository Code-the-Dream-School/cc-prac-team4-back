const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const connectDB = require('./db/connect');
const Pet = require('./models/Pet');
const mongoose = require('mongoose');

const deleteAllPets = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Pet.deleteMany();
    console.log('All pets have been deleted.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

deleteAllPets();
