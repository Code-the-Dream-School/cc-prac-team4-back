const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth-cookies');
const router = express.Router();
const {
  createPet,
  getAllPets,
  getSinglePet,
  updatePet,
  deletePet,
  uploadImage,
} = require('../controllers/petController');

router.route('/').post(isAuth, isAdmin, createPet).get(getAllPets);

router.route('/uploadImage').post(isAuth, isAdmin, uploadImage);

router
  .route('/:id')
  .get(getSinglePet)
  .patch(isAuth, isAdmin, updatePet)
  .delete(isAuth, isAdmin, deletePet);

module.exports = router;
