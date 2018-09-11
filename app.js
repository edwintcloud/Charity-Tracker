// IMPORTS AND VARIABLES
import express from 'express'
import exphbs from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import routes from './routes'
const app = express()

// SET CSS AND JAVSCRIPT DIRECTORY
app.use(express.static('public'));

// REGISTER HANDLEBARS VIEW ENGINE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// BODY PARSER
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// USE OUR ROUTES
app.use(routes)

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-tracker', {
    useNewUrlParser: true
})

// START OUR SERVER
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
