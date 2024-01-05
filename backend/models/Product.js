const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })


const productSchema = Schema({
    name: { 
        type: String,
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    reviews : [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps : true})

module.exports = mongoose.model('Product', productSchema)