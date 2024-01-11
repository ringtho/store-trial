const express = require('express')
const router = express.Router()
const {
  getAllOrders,
  createOrder,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered
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

router.route('/:id/pay')
  .put(authenticateUser, markOrderAsPaid)

router.route('/:id/deliver')
  .put(authenticateUser, authorizeAdmin, markOrderAsDelivered)

module.exports = router