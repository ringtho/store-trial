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
  getCategories,
  getSingleCategory
} = require('../controllers/Categories')


router.route('/')
    .post(authenticateUser, authorizeAdmin, createCategory)
    .get(getCategories)
router.route('/:categoryId')
    .put(authenticateUser, authorizeAdmin, updateCategory)
    .delete(authenticateUser, authorizeAdmin, deleteCategory)
    .get(getSingleCategory)



module.exports = router