const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = ({
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