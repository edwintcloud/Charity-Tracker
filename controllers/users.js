// IMPORT ROUTER
const router = require('express').Router()

// USERS PAGE
router.get('/users', (req, res) => {
    res.send('Hello user')
})

// EXPORT ROUTES
module.exports = router