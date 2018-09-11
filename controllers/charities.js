// IMPORTS AND VARIABLES
import express from 'express'
import Charity from '../models/charity'
const app = express.Router()


/* -----------------------
  |  STATIC ROUTES BELOW  |
   ----------------------- */
    
// HOME PAGE
app.get('/', (req, res) => {
    res.render('home')
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
app.post('/users/:userId/charities/new', (req, res) => {
    
})

// READ - ALL
app.get('/users/:userId/charities', (req, res) => {
    
})

// READ - SINGLE
app.get('/users/:userId/charities/:charityId', (req, res) => {
    
})

// UPDATE
app.put('/users/:userId/charities/:charityId', (req, res) => {
    
})

// DELETE
app.delete('/users/:userId/charities/:charityId', (req, res) => {
    
})

// EXPORT ROUTES
module.exports = app