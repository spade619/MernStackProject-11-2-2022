const mongoose = require('mongoose')


//set json schema for user registration
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a username']
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)