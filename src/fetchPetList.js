const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const connectDB = require('./db/connect');
const Pet = require('./models/Pet');
const mongoose = require('mongoose');

const fetchPetList = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //await Pet.deleteMany();
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

    const petResponse = await axios.get(
      'https://api.petfinder.com/v2/animals?type=dog&limit=100',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const pets = petResponse.data.animals.map((animal) => {
      return {
        createdBy: new mongoose.Types.ObjectId(), // Use 'new' keyword to invoke the ObjectId constructor
        description: animal.description || null,
        petName: animal.name,
        petType: animal.type,
        image: animal.photos,
        age: animal.age,
        size: animal.size,
        gender: animal.gender,
        coatLength: animal.coat || null,
        goodWith: JSON.parse(JSON.stringify(animal.environment).split(',')) || null,
        breed:
            JSON.stringify(animal.breeds).split(',')[0].split(':')[1] || null,
        color:
          JSON.stringify(animal.colors).split(',')[0].split(':')[1].replace(/[^a-zA-Z /]/g, "") || null,
        careAndBehaviour: JSON.parse(JSON.stringify(animal.attributes).split(',')) || null,
      };
    });

    await Pet.insertMany(pets); // `insertMany` to insert multiple pets at once
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetList();
