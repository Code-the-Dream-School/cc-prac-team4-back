const express = require('express');
const router = express.Router();
const { isAuth} = require('../middleware/auth-cookies');

const adoptionController = require('../controllers/adoptionController');

router.post('/pets/:id/adopt', isAuth, adoptionController);

module.exports = router;
