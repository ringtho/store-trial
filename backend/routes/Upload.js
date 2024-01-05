
const path = require('path')
const multer = require('multer')

const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { UnSupportedFileError } = require('../errors')
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true)
    } else {
        cb(new UnSupportedFileError('Please provide a valid image type'), false)
        return
    }
}

const upload = multer({ storage, fileFilter})
const uploadSingleImage = upload.single('image')

router.route('/')
    .post((req, res) => {
        uploadSingleImage(req, res, (err) => {
            if (err) {
                res.status(err.statusCode).json({ error: err.message})
            } else if (req.file) {
                res
                  .status(StatusCodes.OK)
                  .json({
                    msg: 'Image uploaded successfully',
                    image: `/${req.file.path}`,
                  })
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'No image file provided' })
            }
        })
    })

module.exports = router