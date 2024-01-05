const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')
const { NotFoundError } = require('../errors')

const getAllProducts = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'Get All products'})
}

const createProduct = async (req, res) => {
    // const { name, description, price, category, quantity, brand } = req.fields
    const product = await Product.create({...req.fields})
    res.status(StatusCodes.CREATED).json({ product })
}

const updateProduct = async (req, res) => {
//   const { name, description, price, category, quantity, brand } = req.fields
  const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, {new: true})
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
    removeProduct
}