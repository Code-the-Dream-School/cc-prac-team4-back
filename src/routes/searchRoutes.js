const express = require('express');
const router = express.Router();

const {
  searchCatBreeds,
  searchDogBreeds,
  searchCatColors,
  searchDogColors,
} = require('../controllers/searchControllers');

router.get('/cat-breeds', searchCatBreeds);
router.get('/dog-breeds', searchDogBreeds);
router.get('/cat-colors', searchCatColors);
router.get('/dog-colors', searchDogColors);

module.exports = router;
