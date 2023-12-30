const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {timestamps: true,}
)

// Hashing password before creating a user
userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Hashing password while updating user details
userSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt(10)
    this._update.password = await bcrypt.hash(this._update.password, salt)
  }
  next()
})

// Create JWT Token method
userSchema.methods.createJwt = function (res) {
  const token = jwt.sign(
    { userId: this._id }, 
    process.env.JWT_SECRET, { expiresIn: '30d' }
  )
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
  return token
}

// check password on login
userSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User