const express = require('express')
const router = express.Router()
const {
  signUp,
  login,
  logOut,
  getUsers,
  getUserProfile,
  editUserProfile,
  deleteUser,
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
    .delete(deleteUser)

module.exports = router