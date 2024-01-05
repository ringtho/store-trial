require('dotenv').config()
require('express-async-errors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/Users')
const categoriesRoutes = require('./routes/Categories')
const productsRoutes = require('./routes/Products')

const errorHandler = require('./middlewares/error-handler')
const routeNotFound = require('./middlewares/not-found')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/products', productsRoutes)

app.use(errorHandler)
app.use(routeNotFound)

const PORT = process.env.PORT || 5050
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`)
})