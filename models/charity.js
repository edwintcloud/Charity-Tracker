// IMPORT MONGOOSE
import mongoose from 'mongoose'

// CREATE MONGOOSE MODEL
const Charity = mongoose.model ('Charity', {
    name: String,
    amount: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// EXPORT MODEL
module.exports = Charity