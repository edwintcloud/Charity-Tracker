import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import app from '../app'
import Charity from '../models/charity'
const should = chai.should()

// Test charity object

const testCharity = {
    'name': 'TestCharityChai',
    'donations': [{
        'amount': 10,
        'date': new Date()
    },
    {
        'amount': 100.12,
        'date': new Date()
    }],
    'userId': mongoose.Types.ObjectId()
}

// Variable to hold our charity id when we create it
var charityId

// Chai setup
chai.use(chaiHttp)

// Run our tests
describe('Charities', () => {

    // Dispose of our test charities after testing
    after(() => {
        Charity.deleteMany({ name: 'TestCharityChai' }, (err) => {
            console.log(err)
        })
    })

    it('GET / should render home page', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('GET /charities should render charities-list page ', (done) => {
        chai.request(app)
            .get('/charities')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('GET /charities/:id should render charities-list-id page', (done) => {
        chai.request(app)
            .get('/charities/291')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('GET /charities/:id/organizations/:orgId should render charities-organizations-show page', (done) => {
        chai.request(app)
            .get('/charities/291/organizations/222584370')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('POST /users/:userId/charities/new should CREATE a new Charity', (done) => {
        chai.request(app)
            .post(`/users/${testCharity.userId}/charities/new`)
            .send(testCharity)
            .end((err, res) => {
                charityId = res.body.charity._id
                res.should.have.status(200)
                res.should.be.json
                done()
            })
    })

    it('PUT /users/:userId/charities/:charityId should Update a Charity by id', (done) => {
        // modify testCharity to test update
        testCharity.donations[0].amount = 99

        chai.request(app)
            .put(`/users/${testCharity.userId}/charities/${charityId}`)
            .send(testCharity)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                done()
            })
    })

    it('DELETE /users/:userId/charities/:charityId should Delete a Charity by id', (done) => {
        chai.request(app)
            .delete(`/users/${testCharity.userId}/charities/${charityId}`)
            .send(testCharity)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })

})
