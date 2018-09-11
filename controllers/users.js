// IMPORTS AND VARIABLES
import express from 'express'
import User from '../models/user'
const app = express.Router()

/* -----------------------
  |  STATIC ROUTES BELOW  |
   ----------------------- */
    
// USERS PAGE
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.render('users-show', {
            users: users
        })
    })
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
app.post('/users/new', (req, res) => {
    User.create(req.body).then((user) => {
        res.redirect('/users')
    }).catch(console.error)
})

// READ - ALL
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.render('users-show', {
            users: users
        })
    }).catch(console.error)
})

// READ - SINGLE
app.get('/users/:userId', (req, res) => {
    
})

// UPDATE
app.put('/users/:userId', (req, res) => {
    
})

// DELETE
app.delete('/users/:userId', (req, res) => {
    
})

// EXPORT ROUTES
module.exports = app