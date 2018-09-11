'use strict';

// APP SETUP
var app = require('express')();
var exphbs = require('express-handlebars');
var routes = require('./routes');
app.use('/', routes);

// REGISTER HANDLEBARS VIEW ENGINE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// START OUR SERVER
app.listen(3000, function () {
    console.log('App is running on http://localhost:3000');
});