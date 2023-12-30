const { BadRequestError, UnAuthorizedError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

// Create new user controller
const signUp = async (req, res) => {
  const user = await User.create(req.body)
  user.createJwt(res)
  const { _id, name, email, isAdmin } = user
  res.status(StatusCodes.CREATED).json({ 
    user: { _id, name, email, isAdmin }
  })
}

// Login user controller
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password ) {
    throw new BadRequestError('Please provide an email and password')
  }
  const user = await User.findOne({ email })

  if (!user) {
    throw new UnAuthorizedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.checkPassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthorizedError('Invalid Credentials')
  }
  user.createJwt(res)
  const { _id, name, email: user_email, isAdmin } = user
  res.status(StatusCodes.CREATED).json({
    user: { _id, name, email: user_email, isAdmin }
  })
}

// Logout user route
const logOut = async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(StatusCodes.OK).json({ msg: "Successfully logged out user" })
}

const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password")
  res.status(StatusCodes.OK).json({ users })
}

const getUserProfile = async (req, res) => {
  res.status(StatusCodes.OK).json({ user : req.user })
}

const editUserProfile = async (req, res) => {
  let updatedData = {}
  const { name, email, password } = req.body
  
  if (!name && !email && !password) {
    throw new BadRequestError('Please provide a field to update the user details')
  }
  if (name) updatedData.name = name
  if (email) updatedData.email = email
  if (password) updatedData.password = password
  const user = await User.findOneAndUpdate(
    { _id: req.user._id }, 
    updatedData, 
    { new: true, runValidators: true }
  )
  res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Delete User' })
} 

module.exports = {
  signUp,
  login,
  logOut,
  getUsers,
  getUserProfile,
  editUserProfile,
  deleteUser,
}