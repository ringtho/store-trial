const { BadRequestError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')


const getUsers = async(req,res) => {
    res.status(StatusCodes.OK).json({msg: 'Get all Users'})
}

const createUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Create User' })
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
    createUser,
    getSingleUser,
    editUser,
    deleteUser
}