const express = require('express');
const router = express.Router();
const {
  createPet,
  getAllPets,
  getSinglePet,
  updatePet,
  deletePet,
  uploadImage,
} = require('../controllers/petController');

router.route('/').post(createPet).get(getAllPets);

router.route('/uploadImage').post(uploadImage);

router.route('/:id').get(getSinglePet).patch(updatePet).delete(deletePet);

module.exports = router;
