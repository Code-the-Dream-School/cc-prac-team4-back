const express = require('express');
const router = express.Router();

const {
  forgotPasswordController,
  getResetPasswordController,
  useResetPasswordController,
} = require('../controllers/additionalController.js');

router.post('/password/forgot', forgotPasswordController);
router.get('/password/reset/:id/:token', getResetPasswordController);
router.post('/password/reset/:id/:token', useResetPasswordController);

module.exports = router;
