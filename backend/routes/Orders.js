const express = require('express')
const router = express.Router()
const {
  getAllOrders,
  createOrder,
  getUserOrders,
} = require('../controllers/Orders')
const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')

router.route('/')
    .get(authenticateUser, authorizeAdmin, getAllOrders)
    .post(authenticateUser, createOrder)

router.route('/mine')
    .get(authenticateUser, getUserOrders)

module.exports = router