// IMPORT MONGOOSE
import mongoose from 'mongoose'

// CREATE MONGOOSE MODEL
const User = mongoose.model ('User', {
    name: String
})

// EXPORT MODEL
module.exports = User