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

router.get('/me/:id', isAuth, getUserDetails);
router.put('/me/password/update/:id', isAuth, updatePassword);
router.patch('/me/update/:id', isAuth, updateProfile);
router.get('/admin/users/:id', isAuth, isAdmin, getAllUsers);
router.get('/admin/:id', isAuth, isAdmin, getSingleUser);
router.patch('/admin/:id', isAuth, isAdmin, updateUserRole);
router.delete('/admin/:id', isAuth, isAdmin, deleteUser);

module.exports = router;
