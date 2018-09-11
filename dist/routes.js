'use strict';

var routes = require('express').Router();

routes.get('/', function (req, res) {
    res.render('tracker');
});

module.exports = routes;