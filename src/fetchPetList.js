const axios = require('axios');
require('dotenv').config();
const connectDB = require('./db/connect');
const Pet = require('./models/Pet');

const fetchPetList = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //await Pet.deleteMany();
    const payload = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${process.env.PETFINDER_API_KEY}&client_secret=${process.env.PETFINDER_SECRET}`,
    };
    const { data } = await axios
      .post('https://api.petfinder.com/v2/oauth2/token', payload)
      .then((response) => response.json())
      .then((result) =>
        fetch('https://api.petfinder.com/v2/animals?type=cat&limit=100', {
          headers: {
            Authorization: `Bearer ${result.access_token}`,
          },
        })
      )
      .then((response) => response.json());
    await Pet.create({ data });
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetList();
