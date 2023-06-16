const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const fetchPetBreedsList = async () => {
  try {
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
      'https://api.petfinder.com/v2/types/dog/breeds',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = breedResponse.data;
    console.log(data);
    console.log(data.breeds.length);

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetBreedsList();

//68 cat breeds
//275 dog breeds
