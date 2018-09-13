// IMPORTS AND VARIABLES
import express from 'express'
import User from '../models/user'
const app = express.Router()

/* -----------------------
  |  AUTH ROUTES BELOW  |
   ----------------------- */
    
// USERS PAGE
app.get('/users', (req, res) => {
    User.find().then(users => {
        res.render('users-show', {
            users: users
        })
    })
})

// REGISTER PAGE
app.get('/users/register', (req, res) => {
    res.render('users-register')
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
app.post('/users/new', (req, res) => {
    User.create(req.body).then(user => {
        res.render('charities-show', { user: user})
        console.log(user)
    }).catch(err => { 
        console.log(err)
        res.status(400).send({ err: err })
    })
})

// READ - ALL
app.get('/users', (req, res) => {
    User.find().then(users => {
        res.render('users-show', {
            users: users
        })
    }).catch(e => { console.log(e) })
})

// READ - SINGLE
app.get('/users/:userId', (req, res) => {
    User.findById(req.params.userId).then(user => {
        res.send(user)
    }).catch(e => { console.log(e) })
})

// UPDATE
app.put('/users/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body).then(user => {
        res.send(user)
    }).catch(e => { console.log(e) })
})

// DELETE
app.delete('/users/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId).then(user => {
        res.send('User Removed')
    }).catch(e => { console.log(e) })
})

// EXPORT ROUTES
module.exports = app