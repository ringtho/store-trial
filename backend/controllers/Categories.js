const { StatusCodes } = require('http-status-codes')
const Category = require('../models/Category')
const { BadRequestError, NotFoundError } = require('../errors')

const createCategory = async (req, res) => {
    const { name } = req.body
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
        throw new BadRequestError('Category name already exists!')
    }
    const category = await Category.create({ name })
    res.status(StatusCodes.CREATED).json({ category })
}

const updateCategory = async (req, res) => {
    const { name } = req.body
    if (!name  || name === '') {
        throw new BadRequestError('Category name is required!')
    }
    const { categoryId } = req.params
    const existingCategoryId = await Category.findOne({ _id: categoryId })
    if (!existingCategoryId) {
      throw new NotFoundError(`No item found with id: ${categoryId}`)
    }
    const existingCategoryName = await Category.findOne({ name })
    if (existingCategoryName) {
        throw new BadRequestError('Category name already exists!')
    }
    const category = await Category.findOneAndUpdate(
      { _id: categoryId },
      { name },
      { new: true }
    )
    res.status(StatusCodes.OK).json({ category })
}

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params
    const existingCategoryId = await Category.findOne({ _id: categoryId })
    if (!existingCategoryId) {
      throw new NotFoundError(`No item found with id: ${categoryId}`)
    }
    await Category.deleteOne({ _id: categoryId })
    res
      .status(StatusCodes.OK)
      .json({ msg: `Successfully deleted category with id ${categoryId}` })
}

const getCategories = async (req, res) => {
    const categories = await Category.find({ })
    res.status(StatusCodes.OK).json({ categories })
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories
}