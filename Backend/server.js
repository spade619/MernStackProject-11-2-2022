const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

//to connect to database
connectDB()

// set the server
const app = express()

//middleware added
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//endpoint
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//error handler overwrite
app.use(errorHandler)
//server listening to port number initiated
app.listen(port, () => console.log(`Server started on port ${port}`))
