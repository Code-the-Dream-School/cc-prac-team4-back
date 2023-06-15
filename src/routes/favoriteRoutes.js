const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth-cookies');
const {
  getFavorite,
  addFavorite,
  removeFavorite,
  getAllFavorites,
} = require('../controllers/favoriteController');

router.route('/:id').get(isAuth, getFavorite);
router.route('/add').patch(isAuth, addFavorite);
router.route('/remove').patch(isAuth, removeFavorite);
router.route('/').get(isAuth, getAllFavorites);

module.exports = router;
