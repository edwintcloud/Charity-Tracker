// IMPORTS AND VARIABLES
import express from 'express'
import exphbs from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import session from 'express-session'
import Handlebars from 'handlebars'
import HandlebarsIntl from 'handlebars-intl'
import routes from './routes'
const app = express()
const MongoStore = require('connect-mongo')(session)

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-tracker', {
    useNewUrlParser: true
}).catch(e => { console.log(e) })
const db = mongoose.connection

// SET CSS AND JAVSCRIPT DIRECTORY
app.use(express.static('public'));

// REGISTER HANDLEBARS VIEW ENGINE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
  
//============EXPRESS CONFIGURATION============
app.use(session({
    secret: 'fluffybunnies',    
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE

//save our session as a local variable accessible by the templates
app.use(function(req, res, next){
        res.locals.session = req.session;
        next();
});

// USE OUR ROUTES
app.use(routes)
  
// START OUR SERVER
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
