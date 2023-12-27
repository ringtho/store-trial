require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const express = require('express')
const path = require('path')
const usersRouter = require('./routes/Users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// app.get('/api/v1', (req, res) => {
//     res.status(200).json({ msg: 'Smith Ringtho' })
// })

app.use('/api/v1/users', usersRouter)

const PORT = process.env.PORT || 5050
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`)
})