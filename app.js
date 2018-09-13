// IMPORTS AND VARIABLES
import express from 'express'
import exphbs from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import routes from './routes'
const app = express()

// SET CSS AND JAVSCRIPT DIRECTORY
app.use(express.static('public'));

// REGISTER HANDLEBARS VIEW ENGINE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//============EXPRESS CONFIGURATION============
//app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE
//app.use(session({secret: 'fluffybunnies', saveUninitialized: true, resave: true}))
//app.use(passport.initialize())
//app.use(passport.session())

// USE OUR ROUTES
app.use(routes)

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-tracker', {
    useNewUrlParser: true
}).catch(e => { console.log(e) })

// START OUR SERVER
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
