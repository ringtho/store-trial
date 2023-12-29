const express = require('express')
const router = express.Router()
const { 
    getUsers, 
    signUp,
    getSingleUser,
    editUser, 
    deleteUser 
} = require('../controllers/Users')

router.route('/') 
    .get(getUsers)
    .post(signUp)

router.route('/:id')
    .get(getSingleUser)
    .put(editUser)
    .delete(deleteUser)

module.exports = router