const express = require('express')
const router = express.Router()
const { 
    getUsers, 
    createUser,
    getSingleUser,
    editUser, 
    deleteUser 
} = require('../controllers/Users')

router.route('/') 
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getSingleUser)
    .put(editUser)
    .delete(deleteUser)

module.exports = router