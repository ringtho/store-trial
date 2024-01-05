const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')
const { NotFoundError } = require('../errors')

const getAllProducts = async (req, res) => {
    const pageSize = 6
    const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword , $options: 'i'}}
        : {}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize) 
    res
      .status(StatusCodes.OK)
      .json({
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      })
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new NotFoundError(`No item found with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json(product)
}

const createProduct = async (req, res) => {
    // const { name, description, price, category, quantity, brand } = req.fields
    const product = await Product.create({...req.fields})
    res.status(StatusCodes.CREATED).json({ product })
}

const updateProduct = async (req, res) => {
//   const { name, description, price, category, quantity, brand } = req.fields
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.fields },
    { new: true }
  )
  res.status(StatusCodes.OK).json({ product })
}

const removeProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    throw new NotFoundError(`No item found with id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    removeProduct,
    getSingleProduct
}