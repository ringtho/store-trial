require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'I have arrived' })
})

const PORT = process.env.PORT || 5050
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`)
})