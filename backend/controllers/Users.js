const { BadRequestError, UnAuthorizedError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const signUp = async (req, res) => {
  const user = await User.create(req.body)
  user.createJwt(res)
  const { _id, name, email, isAdmin } = user
  res.status(StatusCodes.CREATED).json({ 
    user: { _id, name, email, isAdmin }
  })
}

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

const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get Single User ' })
}

const editUser = async (req, res) => {
//   res.status(StatusCodes.OK).json({ msg: 'Edit User' })
    throw new BadRequestError('Please provide a user to edit')
}

const deleteUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Delete User' })
} 

module.exports = {
  signUp,
  login,
  getUsers,
  getSingleUser,
  editUser,
  deleteUser,
}