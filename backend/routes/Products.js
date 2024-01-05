const express = require('express')
const formidable = require('express-formidable')
const router = express.Router()

const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')
const { 
    getSixProducts, 
    createProduct, 
    updateProduct,
    removeProduct,
    getSingleProduct,
    getAllProducts,
    addProductReview
} = require('../controllers/Products')
const checkId = require('../middlewares/checkId')


router.route('/')
    .get(getSixProducts)
    .post(authenticateUser, authorizeAdmin, formidable(), createProduct)

router.route('/allproducts')
    .get(getAllProducts)

router.route('/:id/reviews')
    .post(authenticateUser, addProductReview)
    .get()

router.route('/:id')
    .put(authenticateUser, authorizeAdmin, formidable(), updateProduct)
    .delete(authenticateUser, authorizeAdmin, removeProduct)
    .get(getSingleProduct)

module.exports = router