require('dotenv').config()
require('express-async-errors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const express = require('express')
const path = require('path')
const usersRouter = require('./routes/Users')
const categoriesRouter = require('./routes/Categories')

const errorHandler = require('./middlewares/error-handler')
const routeNotFound = require('./middlewares/not-found')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/v1/users', usersRouter)
app.use('/api/v1/categories', categoriesRouter)
// app.use('/api/v1/products', productsRouter)

app.use(errorHandler)
app.use(routeNotFound)

const PORT = process.env.PORT || 5050
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`)
})