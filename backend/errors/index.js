const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnAuthorizedError = require('./unauthorized')
const CustomeApiError = require('./custom-error')
const UnSupportedFileError = require('./unsupported-type')

module.exports = {
    BadRequestError,
    NotFoundError,
    UnAuthorizedError,
    CustomeApiError,
    UnSupportedFileError
}