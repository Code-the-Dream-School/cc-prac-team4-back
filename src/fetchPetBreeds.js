const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const PetBreed = require('./models/breedModel');
const connectDB = require('./db/connect');
const mongoose = require('mongoose');

const fetchPetBreedsList = async () => {
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

    const breedResponse = await axios.get(
      'https://api.petfinder.com/v2/types/cat/breeds',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const breeds = breedResponse.data.breeds;
    //console.log(breeds);

    breeds.forEach(async () => {
      let petBreeds = {
        petType: 'Cat',
        breedName: breeds.name,
        createdBy: new mongoose.Types.ObjectId(),
      };
      console.log(petBreeds);
      await PetBreed.insertMany(petBreeds);
    });

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetBreedsList();
