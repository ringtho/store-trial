const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')
const { NotFoundError, BadRequestError } = require('../errors')

const getSixProducts = async (req, res) => {
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

const getAllProducts = async (req, res) => {
    const products = await Product.find({ }).populate('category').limit(12).sort({ createdAt: -1})
    res.status(StatusCodes.OK).json(products)
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

const addProductReview = async (req, res) => {
    const { rating, comment } = req.body
    console.log(typeof rating)
    if (!rating || !comment) {
        throw new BadRequestError('Please provide a rating and comment')
    }
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new NotFoundError(`No item found with id: ${req.params.id}`)
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
        throw new BadRequestError('Product already reviewed')
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) /product.reviews.length
    await product.save()
    res.status(StatusCodes.OK).json({ msg: "Review Added" })

}

module.exports = {
    getSixProducts,
    getAllProducts,
    createProduct,
    updateProduct,
    removeProduct,
    getSingleProduct,
    addProductReview
}