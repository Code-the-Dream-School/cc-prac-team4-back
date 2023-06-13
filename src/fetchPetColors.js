const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const fetchPetColorList = async () => {
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

    const colorResponse = await axios.get(
      'https://api.petfinder.com/v2/types/cat',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = colorResponse.data;
    console.log(data);
    //console.log('Success');

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fetchPetColorList();
