// IMPORTS AND VARIABLES
import express from 'express'
import request from 'request'
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
    request('https://api.data.charitynavigator.org/v2/Lists?app_id=b78cb105&app_key=f852075432126ebcc982c547c5b0e25e', (err, response, body)=> {
        if(!err && response.statusCode === 200) {
            const resBody = JSON.parse(body)
            res.render('charities-list', { charities: resBody })
        }else {
            console.log(err)
            res.render('charities-list')
        }
    })
})

app.get('/charities/:id', (req, res) => {
    request('https://api.data.charitynavigator.org/v2/Lists/' + req.params.id + '?app_id=b78cb105&app_key=f852075432126ebcc982c547c5b0e25e', (err, response, body) => {
        if(!err && response.statusCode == 200) {
            const resBody = JSON.parse(body)
            res.render('charities-list-id', {charities: resBody})
        } else {
            console.log(err)
            res.render('charities-list-id')
        }
    })
})

app.get('/charities/:id/organizations/:orgId', (req, res) => {
    request('https://api.data.charitynavigator.org/v2/Organizations/' + req.params.orgId + '?app_id=b78cb105&app_key=f852075432126ebcc982c547c5b0e25e', (err, response, body) => {
        if(!err && response.statusCode == 200) {
            const resBody = JSON.parse(body)
            res.render('charities-organizations-show', {organization: resBody})
            
        } else {
            res.render('charities-organizations-show')
        }
    })
})

/* ---------------------
  |  CRUD ROUTES BELOW  |
   --------------------- */
    
// CREATE
app.post('/users/:userId/charities/new', (req, res) => {
    Charity.findOne({ name: req.body.name }).then(charity => {
        if(!charity) {
            Charity.create(req.body).then(charity => {
                res.status(200).send({ charity: charity })
            })
        } else { 
            res.status(200).send({ reason: 'That charity is already in your list!' })
        }
    }).catch(e => { 
        res.status(200).send({ err: e })
        console.log(e) 
    })
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