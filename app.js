// APP SETUP
const app = require('express')()
const exphbs = require('express-handlebars')
import mongoose from 'mongoose'
const routes = require('./routes')
app.use(routes)

// IMPORT MONGOOSE MODELS
const Charity = require('./models/charity')
const User = require('./models/user')

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-tracker', {
    useNewUrlParser: true
})

// REGISTER HANDLEBARS VIEW ENGINE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// START OUR SERVER
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
