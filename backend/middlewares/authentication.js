const { UnAuthorizedError } = require('../errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateUser = async (req, res, next) => {
  const token = req?.cookies.jwt
  if (!token) {
    throw new UnAuthorizedError('Login to continue')
  }

  try {
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET
    )
    req.user = await User.findById(userId).select("-password")
    next() 
  } catch (error) {
    throw new UnAuthorizedError('Authentication Invalid')
  }
}

// check if user is admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      throw new UnAuthorizedError('You require admin priviledges to continue')
    }
}


module.exports = { authorizeAdmin, authenticateUser }
