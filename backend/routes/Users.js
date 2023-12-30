const express = require('express')
const router = express.Router()
const {
  signUp,
  login,
  logOut,
  getUsers,
  getUserProfile,
  editUserProfile,
  deleteUserById,
  getUserById,
  editUserById
} = require('../controllers/Users')
const { 
  authenticateUser, 
  authorizeAdmin 
} = require('../middlewares/authentication')

router.route('/') 
    .get(authenticateUser, authorizeAdmin, getUsers)
    .post(signUp)

router.route('/auth')
    .post(login)

router.route('/logout')
    .post(logOut)

router.route('/profile')
    .get(authenticateUser, getUserProfile)
    .put(authenticateUser, editUserProfile)

router.route('/:id')
    .delete(authenticateUser, authorizeAdmin, deleteUserById)
    .get(authenticateUser, authorizeAdmin, getUserById)
    .put(authenticateUser, authorizeAdmin, editUserById)
module.exports = router