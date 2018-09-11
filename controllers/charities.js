// IMPORT ROUTER
const router = require('express').Router()

/* -----------------------
  |  STATIC ROUTES BELOW  |
   ----------------------- */
    
// HOME PAGE
router.get('/', (req, res) => {
    res.render('home')
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
router.post('/users/:userId/charities/new', (req, res) => {
    
})

// READ - ALL
router.get('/users/:userId/charities', (req, res) => {
    
})

// READ - SINGLE
router.get('/users/:userId/charities/:charityId', (req, res) => {
    
})

// UPDATE
router.put('/users/:userId/charities/:charityId', (req, res) => {
    
})

// DELETE
router.delete('/users/:userId/charities/:charityId', (req, res) => {
    
})

// EXPORT ROUTES
module.exports = router