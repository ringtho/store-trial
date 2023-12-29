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

router.route('/') 
    .get(getUsers)
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