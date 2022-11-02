//use jwt authentication
const jwt = require('jsonwebtoken')
// to encrypt password by hashing
const bcrypt = require('bcryptjs')
//use express async handler
const asyncHandler = require('express-async-handler')
//use the schema for registration on userModel.js
const User = require('../models/userModel')


//register user function

//---------------------------------------------------------------------------------
//description = to register a new user
//route = post /api/users
//access = Public
const registerUser = asyncHandler(async (req, res) => {
   
    //use implement schema for registration
    const {name, email, password} = req.body
    //check if schema objects are available. -returns an error if none
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }

    //check if user exist. -throws error if existed
    const userExists = await User.findOne({email})
    
    if(userExists) {
        res.status(400)
        throw new Error('User already exsists')
    }

    //Hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
   
    console.log(req.path, req.method)
})

//---------------------------------------------------------------------------------
//description = to authenticate a user
//route = post /api/users/login
//access = Public
const loginUser = asyncHandler(async (req, res) => {
    console.log(req.path, req.method)
    res.json({message: ' User logged in'})

})

//---------------------------------------------------------------------------------
//description = to get a logged in user
//route = GET /api/users/me
//access = Public
const getMe = asyncHandler(async (req, res) => {
    console.log(req.path, req.method)
    res.json({message: 'user info displayed'})

})

module.exports = {
    registerUser,
    loginUser,
    getMe
}