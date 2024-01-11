const { StatusCodes } = require('http-status-codes')
const Order = require('../models/Order')
const Product = require('../models/Product')
const { BadRequestError, NotFoundError } = require('../errors')

function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 100? 0 : 10000
    const taxRate = 0.15
    const taxPrice = (itemsPrice * taxRate)
    const totalPrice = (
        itemsPrice + shippingPrice + taxPrice
    )
    return {
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice,
        totalPrice
    }
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(StatusCodes.OK).json(orders)
}

const createOrder = async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod} = req.body
    if (orderItems && orderItems.length === 0) {
        throw new BadRequestError('No Order Items ')
    }

    const itemsFromDB = await Product.find({ 
        _id: {$in: orderItems.map((x) => x._id)}
    })

    const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id)
        if (!matchingItemFromDB) {
            throw new NotFoundError(`Product not found with id: ${itemFromClient._id}`)
        }

        return {
            ...itemFromClient,
            product: itemFromClient._id,
            price: matchingItemFromDB.price,
            _id: undefined
        }
    })

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems)

    const order = await Order.create({
        orderItems: dbOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    res.status(StatusCodes.CREATED).json(order)
}

const getUserOrders = async (req, res) => {
    const userId = req.user._id
    const orders = await Order.find({ user: userId})
    res.status(StatusCodes.OK).json(orders)
}

const countTotalOrders = async (req, res) => {
    const totalOrders = await Order.countDocuments()
    res.status(StatusCodes.OK).json({ totalOrders })
}

const calculateTotalSales = async (req, res) => {
    const orders = await Order.find({})
    const totalSales = orders.reduce((acc, order) => {
        acc + order.price, 0
    })
    res.status(StatusCodes.OK).json({ totalSales })
}

const calculateTotalSalesByDate = async (req, res) => {
    const salesByDate = await Order.aggregate([
        {
            $match: {
                isPaid: true
            },
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$paidAt'}
                },
                totalSales: { $sum: '$totalPrice'}
            }
        }

    ])

    res.json(StatusCodes.OK).json(salesByDate)
}

const findOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        throw new NotFoundError(`Order with id "${req.params.id}" not found`)
    }
    res.status(StatusCodes.OK).json(order)
}

module.exports = {
    getAllOrders,
    createOrder,
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    findOrderById 
}