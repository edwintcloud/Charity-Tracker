// IMPORTS AND VARIABLES
import express from 'express'
import Charity from '../models/charity'
import User from '../models/user'
const app = express.Router()


/* -----------------------
  |  STATIC ROUTES BELOW  |
   ----------------------- */
    
// HOME PAGE
app.get('/', (req, res) => {
    if(req.session.userId) {
        User.findById(req.session.userId).then(user => {
            Charity.find({ userId: user._id }).then(charities => {    
                res.render('charities-show', { user: user, charities: charities })    
            })
        }).catch(e => { console.log(e) })
    } else{
        res.render('charities-show')
    }
})

// CHARITIES LIST PAGE
app.get('/charities', (req, res) => {
    res.render('charities-list')
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
app.post('/users/:userId/charities/new', (req, res) => {
    Charity.create(req.body).then(charity => {
        res.status(200).send({ charity: charity })
    }).catch(e => { 
        res.status(200).send({ err: e })
        console.log(e) 
    })
})

// READ - ALL
app.get('/users/:userId/charities', (req, res) => {
    Charity.find({ userId: req.params.userId }).then(charities => {
        
    }).catch(e => { console.log(e) })
})

// READ - SINGLE
app.get('/users/:userId/charities/:charityId', (req, res) => {
    Charity.findById(req.params.charityId).then(charity => {
        
    }).catch(e => { console.log(e) })
})

// UPDATE
app.put('/users/:userId/charities/:charityId', (req, res) => {
    Charity.findByIdAndUpdate(req.params.charityId, req.body).then(charity => {
        res.status(200).send()
    }).catch(e => { 
        res.status(400).send({ err: e })
        console.log(e) 
    })
})

// DELETE
app.delete('/users/:userId/charities/:charityId', (req, res) => {
    Charity.findByIdAndRemove(req.params.charityId).then(charity => {
        res.status(200).send()
    }).catch(e => { 
        res.status(400).send({ err: e })
        console.log(e) 
    })
})

// EXPORT ROUTES
module.exports = app