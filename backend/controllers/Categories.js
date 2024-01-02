const { StatusCodes } = require('http-status-codes')
const Category = require('../models/Category')
const { BadRequestError } = require('../errors')

const createCategory = async (req, res) => {
    const { name } = req.body
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
        throw new BadRequestError('Category name already exists')
    }
    const category = await Category.create({ name })
    res.status(StatusCodes.OK).json({ category })
}

module.exports = {
    createCategory
}