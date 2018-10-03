import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import app from '../app'
import User from '../models/user'
const should = chai.should()

// Test user object

const testUser = {
    'firstName': 'TestUserChai',
    'lastName': 'super',
    'email': 'tucsuper@awesome.com',
    'password': 'donkeyPunch'
}

// Variable to hold our user id when we create it
var userId

// Chai setup
chai.use(chaiHttp)

// Run our tests
describe('Users', () => {

    // Dispose of our test users after testing
    after(() => {
        User.deleteMany({ firstName: 'TestUserChai' }, (err) => {
            console.log(err)
        })
    })

    it('GET /users/register should render users-register page', (done) => {
        chai.request(app)
            .get('/users/register')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('POST /users/new should create a new user', (done) => {
        chai.request(app)
            .post('/users/new')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                userId = res.body.user._id
                done()
            })
    })

    it('POST /users/login should create a session', (done) => {
        chai.request(app)
            .post('/users/login')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.headers['set-cookie'].should.not.be.empty
                done()
            })
    })

    it('POST /users/logout should remove a session', (done) => {
        chai.request(app)
            .post('/users/logout')
            .end((err, res) => {
                res.should.have.status(200)
                should.equal(res.headers['set-cookie'], undefined)
                done()
            })
    })

    it('GET /users/:userId/charities should return charities for single user', (done) => {
        chai.request(app)
            .get(`/users/${userId}/charities`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property('charities')
                done()
            })
    })



})
