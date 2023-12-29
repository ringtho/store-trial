const { BadRequestError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const bycrypt = require('bcryptjs')


const getUsers = async (req,res) => {
  const users = await User.find({ })
  res.status(StatusCodes.OK).json({ users })
}

const signUp = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJwt()
  const { _id, name, email, isAdmin } = user
  res.status(StatusCodes.CREATED).json({ 
    user: { _id, name, email, isAdmin },
    token
  })
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
    getUsers,
    signUp,
    getSingleUser,
    editUser,
    deleteUser
}