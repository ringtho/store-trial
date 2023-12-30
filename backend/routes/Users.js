const express = require('express')
const router = express.Router()
const {
  signUp,
  login,
  logOut,
  getUsers,
  getSingleUser,
  editUser,
  deleteUser,
} = require('../controllers/Users')
const { authenticateUser, authenticateAdmin } = require('../middlewares/authentication')

router.route('/') 
    .get(authenticateUser, authenticateAdmin, getUsers)
    .post(signUp)

router.route('/auth')
    .post(login)

router.route('/logout')
    .post(logOut)

router.route('/:id')
    .get(getSingleUser)
    .put(editUser)
    .delete(deleteUser)

module.exports = router