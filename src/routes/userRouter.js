const express = require('express');
const router = express.Router();

const {
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { isAuth, isAdmin } = require('../middleware/auth-cookies');

router.get('/me/', isAuth, getUserDetails);
router.patch('/me/password', isAuth, updatePassword);
router.patch('/me/update', isAuth, updateProfile);
router.get('/admin/users/', isAuth, isAdmin, getAllUsers);
router.get('/admin/:id', isAuth, isAdmin, getSingleUser);
router.patch('/admin/:id', isAuth, isAdmin, updateUserRole);
router.delete('/admin/:id', isAuth, isAdmin, deleteUser);

module.exports = router;
