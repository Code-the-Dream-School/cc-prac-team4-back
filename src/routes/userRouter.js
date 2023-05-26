const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPasswordController,
  resetPasswordController,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { auth, authorizeRoles } = require("../../middleware/authentication");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/forgot", forgotPasswordController);
router.put("/password/reset", resetPasswordController);
router.get("/me/:id", auth, getUserDetails);
router.put("/me/password/update/:id", auth, updatePassword);
router.patch("/me/update/:id", auth, updateProfile);
router.get("/admin/users/:id", auth, authorizeRoles, getAllUsers);
router.get("/admin/:id", auth, authorizeRoles, getSingleUser);
router.patch("/admin/:id", auth, authorizeRoles, updateUserRole);
router.delete("/admin/:id", auth, authorizeRoles, deleteUser);

module.exports = router;
