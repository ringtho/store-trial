const express = require('express')
const router = express.Router()
const {
  getAllOrders,
  createOrder,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById
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

router.route('/total-order')
  .get(authenticateUser, authorizeAdmin, countTotalOrders)

router.route('/total-sales')
  .get(authenticateUser, authorizeAdmin, calculateTotalSales)

router.route('/total-sales-by-date')
  .get(authenticateUser, authorizeAdmin, calculateTotalSalesByDate)

router.route('/:id')
  .get(authenticateUser, findOrderById)

module.exports = router