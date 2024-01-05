const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')

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

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct
}