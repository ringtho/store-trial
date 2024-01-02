const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/Categories')


router.route('/')
    .post(authenticateUser, authorizeAdmin, createCategory)
router.route('/:categoryId')
    .put(authenticateUser, authorizeAdmin, updateCategory)
    .delete(authenticateUser, authorizeAdmin, deleteCategory)

module.exports = router