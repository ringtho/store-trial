const { StatusCodes } = require("http-status-codes")

const errorHandler = async (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, Please try again later',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.code === 11000) {
    customError.msg = `User with email '${err.keyValue.email}' already exists`
  }

  if (err.name === 'CastError') {
    console.log(err.value)
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  return res.status(customError.statusCode).json({ error: customError.msg })
}

module.exports = errorHandler