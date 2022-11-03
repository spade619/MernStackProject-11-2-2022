const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//authentication token for the middleware 
const protect = asyncHandler(async (req, res, next) => {
    let token
    //check if token bearer is true
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        try {
           //get token from header splits into an array ex.(Bearer asdasdaqe12312)
           token = req.headers.authorization.split(' ')[1]
           //decvode and verify token using SECRET
           const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
          // Get user from the token then assign to route
          req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not authorized')
        }
    }
    //if theres no token
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}