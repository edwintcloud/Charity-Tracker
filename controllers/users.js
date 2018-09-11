// IMPORT ROUTER
const router = require('express').Router()

/* -----------------------
  |  STATIC ROUTES BELOW  |
   ----------------------- */
    
// USERS PAGE
router.get('/users', (req, res) => {
    res.send('Hello user')
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
router.post('/users/new', (req, res) => {
    
})

// READ - ALL
router.get('/users', (req, res) => {
    
})

// READ - SINGLE
router.get('/users/:userId', (req, res) => {
    
})

// UPDATE
router.put('/users/:userId', (req, res) => {
    
})

// DELETE
router.delete('/users/:userId', (req, res) => {
    
})

// EXPORT ROUTES
module.exports = router