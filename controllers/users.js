// IMPORTS AND VARIABLES
import express from 'express'
import User from '../models/user'
import Charity from '../models/charity'
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

//Logout
app.post('/users/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                return next(err)
            } else {
                return res.status(200).send()
            }
        })
    }
})

//login
app.post('/users/login', (req, res) => {
    User.authenticate(req.body.email, req.body.password, (err, user, reason) => {
            if(err) throw err
            if(user) {
                req.session.userId = user._id
                res.status(200).send()
            }
            if(reason) {
                res.status(200).send({ reason: reason})
            }
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
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err) throw err
        if(!user) {
            User.create(req.body).then(user => {
                req.session.userId = user._id
                res.status(200).send()
            })
        } else {
            res.status(200).send({ 
                reason: 'Email already registered! If you have forgotten your password, please contact the administrator.' 
            })
        }
    }).catch(err => { 
        console.log(err)
    })
})

// GET CHARITIES FOR SINGLE USER WITH OPTIONAL QUERY PARAMS
app.get('/users/:userId/charities', (req, res) => {
    var searchTerm = {}
    if (req.query.id) {
        searchTerm = { _id: req.query.id }
    } else if (req.query.name) {
        searchTerm = { name: req.query.name }
    }
    Charity.find(searchTerm).then(charities => {
        if(charities.length > 0) {
            res.status(200).send({ charities: charities })
        } else {
            res.status(200).send()
        }
    }).catch(e => { 
        res.status(200).send({ err: e })
        console.log(e) 
    })
})

// // READ - ALL
// app.get('/users', (req, res) => {
//     User.find().then(users => {
//         res.render('users-show', {
//             users: users
//         })
//     }).catch(e => { console.log(e) })
// })
// 
// // READ - SINGLE
// app.get('/users/:userId', (req, res) => {
//     User.findById(req.params.userId).then(user => {
//         res.send(user)
//     }).catch(e => { console.log(e) })
// })
// 
// // UPDATE
// app.put('/users/:userId', (req, res) => {
//     User.findByIdAndUpdate(req.params.userId, req.body).then(user => {
//         res.send(user)
//     }).catch(e => { console.log(e) })
// })
// 
// // DELETE
// app.delete('/users/:userId', (req, res) => {
//     User.findByIdAndRemove(req.params.userId).then(user => {
//         res.send('User Removed')
//     }).catch(e => { console.log(e) })
// })

// EXPORT ROUTES
module.exports = app