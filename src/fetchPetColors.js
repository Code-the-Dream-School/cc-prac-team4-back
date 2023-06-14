const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const PetColor = require('./models/colorModel');
const connectDB = require('./db/connect');
const mongoose = require('mongoose');

const fetchPetColorList = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const payload = querystring.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.PETFINDER_API_KEY,
      client_secret: process.env.PETFINDER_SECRET,
    });
    const response = await axios.post(
      'https://api.petfinder.com/v2/oauth2/token',
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const { access_token } = response.data;

    const colorResponse = await axios.get(
      'https://api.petfinder.com/v2/types/dog',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const colors = Object.values(colorResponse.data.type.colors);
    const theLength = Number(colors.length);

    colors.forEach(async (color) => {
      let petColors = {
        petType: colorResponse.data.type.name,
        colorName: color,
        createdBy: new mongoose.Types.ObjectId(),
      };
      console.log(petColors);
      //return petColors;
      await PetColor.insertMany(petColors);
    });

    // console.log(colors);
    // console.log(theLength);

    // console.log('Success. Colors are fetched.');

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetColorList();
