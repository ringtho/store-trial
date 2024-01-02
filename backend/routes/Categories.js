const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')
const { createCategory } = require('../controllers/Categories')


router.route('/')
    .post(authenticateUser, authorizeAdmin, createCategory)

module.exports = router