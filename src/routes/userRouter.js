const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { auth, authorizeRoles } = require("../../middleware/auth-cookies");

router.get("/me/:id", auth, getUserDetails);
router.put("/me/password/update/:id", auth, updatePassword);
router.patch("/me/update/:id", auth, updateProfile);
router.get("/admin/users/:id", auth, authorizeRoles, getAllUsers);
router.get("/admin/:id", auth, authorizeRoles, getSingleUser);
router.patch("/admin/:id", auth, authorizeRoles, updateUserRole);
router.delete("/admin/:id", auth, authorizeRoles, deleteUser);

module.exports = router;
