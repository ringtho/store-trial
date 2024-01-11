const express = require('express')
const router = express.Router()
const { getAllOrders, createOrder } = require('../controllers/Orders')
const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')

router.route('/')
    .get(authenticateUser, getAllOrders)
    .post(authenticateUser, createOrder)

module.exports = router