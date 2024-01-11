const { StatusCodes } = require('http-status-codes')
const Order = require('../models/Order')
const { BadRequestError } = require('../errors')

const getAllOrders = (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'Orders are coming' })
}

const createOrder = async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod} = req.body
    if (orderItems && orderItems.length === 0) {
        throw new BadRequestError('')
    }

    res.status(StatusCodes.CREATED).json({ msg: 'Orders Cretae' })
}

module.exports = {
    getAllOrders,
    createOrder
}