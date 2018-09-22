// IMPORT MONGOOSE
import mongoose from 'mongoose'

// CREATE MONGOOSE MODEL
const Charity = mongoose.model ('Charity', {
    name: String,
    donations: [{
        amount: Number,
        date: Date
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// EXPORT MODEL
module.exports = Charity