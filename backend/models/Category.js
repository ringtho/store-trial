const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Category name is required!'],
        maxLength: 32,
        lowercase: true,
        unique: true
    },

})

module.exports = mongoose.model('Category', categorySchema)