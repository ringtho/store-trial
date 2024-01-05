const express = require('express')
const formidable = require('express-formidable')
const router = express.Router()

const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')
const { 
    getAllProducts, 
    createProduct, 
    updateProduct
} = require('../controllers/Products')
const checkId = require('../middlewares/checkId')


router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizeAdmin, formidable(), createProduct)

router.route('/:id')
    .put(authenticateUser, authorizeAdmin, formidable(), updateProduct)

module.exports = router