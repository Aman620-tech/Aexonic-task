const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    secPass: {
        type: String
    },
    mobile_no: {
        type: String,
        trim: true,
        required: true

    },
    address: {
        type: String,
        trim: true,
    },
    token: [{
        token: {
            type: String,

        }
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;