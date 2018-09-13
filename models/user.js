// IMPORT MONGOOSE
import mongoose from 'mongoose'

// CREATE MONGOOSE MODEL
const User = mongoose.model ('User', {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, // md5 or sha hash?
        required: true
    }
})

// EXPORT MODEL
module.exports = User