const express = require('express')
const formidable = require('express-formidable')
const router = express.Router()

const {
  authenticateUser,
  authorizeAdmin,
} = require('../middlewares/authentication')
const { 
    getAllProducts, 
    createProduct 
} = require('../controllers/Products')
const checkId = require('../middlewares/checkId')


router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizeAdmin, formidable(), createProduct)

module.exports = router