// IMPORT OUR CONTROLLERS
const charities = require('./controllers/charities')
const users = require('./controllers/users')

// BUILD ROUTES ARRAY AND EXPORT
const routes = [charities, users]
module.exports = routes