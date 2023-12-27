const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/Users')
const { get } = require('express/lib/request')


router.route('/') 
    .get(getUsers)

module.exports = router