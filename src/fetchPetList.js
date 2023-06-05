const axios = require('axios');
require('dotenv').config();
const connectDB = require('./db/connect');
const Pets = require('./models/Pet');

//const fetchPetList = async () => {
//  try {
//    await connectDB(process.env.MONGO_URI);
//    await Pets.deleteMany();
//    const payload = {
//      headers: {
//        'Content-Type': 'application/x-www-form-urlencoded',
//      },
//      body: `grant_type=client_credentials&client_id=${PETFINDER_API_KEY}&client_secret=${PETFINDER_SECRET}`,
//    };
//    const { data } = await axios
//      .post('https://api.petfinder.com/v2/oauth2/token', payload)
//      .then( function (response).json()))
//      .then((result) =>
//        fetch('https://api.petfinder.com/v2/animals?type=dog', {
//          headers: {
//            Authorization: `Bearer ${result.access_token}`,
//          },
//        })
//          .then((response) => response.json())
//          .then((result) => console.log(result))
//      );
//  } catch (error) {}
//};
//
//module.exports = fetchPetList;
