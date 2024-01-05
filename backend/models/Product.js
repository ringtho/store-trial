const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: 50
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating']
    },
    comment: {
        type: String,
        required: [true, 'Please provide a comment']
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
        required: [true, 'Please provide a product name']
    },
    image: {
        type: String,
        required: [true, 'Please provide the image of the product']
    },
    brand: {
        type: String,
        required: [true, 'Please provide the brand of the product']
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide the quantity of the product']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description']
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