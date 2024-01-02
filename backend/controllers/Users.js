const { BadRequestError, UnAuthorizedError, NotFoundError } = require('../errors')
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

// Get user profile details if currently logged in user
const getUserProfile = async (req, res) => {
  res.status(StatusCodes.OK).json({ user : req.user })
}

// Edit currently logged in user details
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
  ).select('name email isAdmin')
  res.status(StatusCodes.OK).json({ user})
}

/**
 * 
 * Admin Routes
 */

// Get all users by admin
const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password")
  res.status(StatusCodes.OK).json({ users, count: users.length })
}

// Get a user by Id by the Admin
const getUserById = async (req, res) => {
  const userId = req?.params.id
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    throw new NotFoundError(`No item found with id: ${userId}`)
  }
  res.status(StatusCodes.OK).json({ user })
}

// Edit user by id
const editUserById = async (req, res) => {
  const userId = req?.params.id
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw new NotFoundError(`No item found with id: ${userId}`)
  }
  const { name, email, isAdmin } = req.body
  if (!name && !email && !isAdmin) {
    throw new BadRequestError(
      'Please provide a field to update the user details'
    )
  }
  let updatedData = {}
  if (name) updatedData.name = name
  if (email) updatedData.email = email
  if (isAdmin) updatedData.isAdmin = isAdmin
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id }, 
    updatedData, 
    {
      new: true,
     runValidators: true,
  }).select("name email isAdmin")

  res.status(StatusCodes.OK).json({ user: updatedUser })
}

// Delete a user by Id by the Admin
const deleteUserById = async (req, res) => {
  const userId = req?.params.id
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw new NotFoundError(`No item found with id: ${userId}`)
  }
  if (user.isAdmin) {
    throw new UnAuthorizedError('You cannot delete an admin')
  }
  await User.deleteOne({ _id: user._id })
  res.status(StatusCodes.OK).json({ msg: `successfully deleted user with id: ${userId}` })
} 

module.exports = {
  signUp,
  login,
  logOut,
  getUsers,
  getUserProfile,
  editUserProfile,
  getUserById,
  deleteUserById,
  editUserById
}