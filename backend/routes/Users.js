const express = require('express')
const router = express.Router()
const {
  signUp,
  login,
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

router.route('/:id')
    .get(getSingleUser)
    .put(editUser)
    .delete(deleteUser)

module.exports = router