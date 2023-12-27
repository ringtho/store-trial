const { StatusCodes } = require('http-status-codes')

const routeNotFound = async (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Route does not exist" })
}

module.exports = routeNotFound