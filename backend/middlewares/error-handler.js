const { StatusCodes } = require("http-status-codes")

const errorHandler = async (err, req, res, next) => {
  console.log(err)
  if(err) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong, Please try again later' })
}

module.exports = errorHandler