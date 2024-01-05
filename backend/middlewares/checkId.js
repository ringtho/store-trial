const { isValidObjectId } = require('mongoose')
const { NotFoundError } = require('../errors')

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        throw new NotFoundError(`Invalid Object of: ${req.params.id}`)
    }
    next()
}

module.exports = checkId