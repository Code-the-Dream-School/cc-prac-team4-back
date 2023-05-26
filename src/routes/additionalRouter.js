const express = require("express");
const router = express.Router();

const {
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/additionalController");

router.post("/password/forgot", forgotPasswordController);
router.put("/password/reset", resetPasswordController);

module.exports = router;
