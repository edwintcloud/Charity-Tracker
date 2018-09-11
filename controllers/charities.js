// IMPORT ROUTER
const router = require('express').Router()

// LANDING PAGE
router.get('/', (req, res) => {
    res.render('home')
})

// EXPORT ROUTES
module.exports = router