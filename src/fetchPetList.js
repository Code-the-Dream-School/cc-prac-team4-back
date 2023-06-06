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
      'https://api.petfinder.com/v2/animals?type=cat&limit=100',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const pets = petResponse.data.animals.map((animal) => {
      return {
        createdBy: new mongoose.Types.ObjectId(), // Use 'new' keyword to invoke the ObjectId constructor
        description: animal.description || 'No description available', // Use a default value if description is not available
        petName: animal.name || '',
        petType: 'Cat',
        image: animal.image || '/uploads/example.jpeg', // URL image or use a default image
        // Map other fields from the animal object as needed
      };
    });

    // await Pet.create(pets);
    await Pet.insertMany(pets); // `insertMany` to insert multiple pets at once
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetList();
