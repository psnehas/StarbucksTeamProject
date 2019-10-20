var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
let rooturl = 'http://localhost:3001';

describe('Mocha Test Harness:', () => {
    //addtagline
    it("Test Case 1 - User should be able to place order", (done) => {

        //sample data
        var data={
            "email":"sample@sample.com",
            "cardno": "111111111",
            "qty": "5",
            "item": "coffee",
            "milk":"yes"
          }
        chai.request(rooturl)
        .post('/orders')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })


    it("Test Case 2 - Not existing User should not be able to place order", (done) => {

        //sample data
        var data={
            "email":"sample@sle.com",
            "cardno": "111111111",
            "qty": "5",
            "item": "coffee",
            "milk":"yes"
          }
        chai.request(rooturl)
        .post('/orders')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(400);
        done();
        });
    })

    it("Test Case 3 - User cant use non existing card to place order", (done) => {

        //sample data
        var data={
            "email":"sample@sample.com",
            "cardno": "111111",
            "qty": "5",
            "item": "coffee",
            "milk":"yes"
          }
        chai.request(rooturl)
        .post('/orders')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(400);
        done();
        });
    })


    it("Test case 4 - User should be able to add card",(done)=>{
        var data={
            "cardId" : 111111117,
            "cardCode" :112,
            "email":"sample@sample.com"
        }
        chai.request(rooturl)
        .post('/addCard')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(201);
        done();
        });
    })
})

/**
 * @type User & Authentication Test Cases
 */
describe('User & Authentication', () => {
    //Generate random email address prefix
    const emailPrefix = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    // Append email formatting
    const email       = `${emailPrefix}@chaitesting.com`
    // Define testing phone #
     const phone       = `4150000000`
    // Default pin value
    const pin         = `1234`
    // Pin update value
    const newPin      = '0987'

    // Test 1: Register New User
    it("Create User - User should be able to register", (done) => {
        // Relevant sample data
        var data={
            "email" : `${email}`,
            "pin"   : `${pin}`  ,
            "phone" : `${phone}`
        }

        chai.request(rooturl)
        .post('/user')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })

    // Test 2: Login with newly created account
    it("Authenticate User - User should be able to login", (done) => {
        // Relevant sample data
        var data = {
            "email" : `${email}`,
            "pin"   : `${pin}`
        }

        chai.request(rooturl)
        .post('/user/authenticate')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

    // Test 3: Logout with newly created account
    it("De-Authenticate User - User should be able to logout", (done) => {
        // Relevant sample data
        var data = {
            "email": `${email}`,
        }

        chai.request(rooturl)
        .post('/user/logout')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

    // Test 4: Change pin number on new account
    it("Change Pin - User should be able to change pin and login", (done) => {
        //sample data
        var data = {
            "email"   : `${email}`,
            "pin"     : `${pin}`,
            "newPin"  : `${newPin}`
        }

        chai.request(rooturl)
        .post('/user/pin')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

    // Test 5: Delete newly created account
    it("Delete User - Accounts should be able to be removed", (done) => {
        chai.request(rooturl)
        .delete(`/user/${email}`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

})

describe('Mocha Test for payments', () => {
    //addtagline
    it("Test Case 1 - User should be able to pay if balance is sufficient", (done) => {

        //sample data
        var data={
            "email":"sample@sample.com",
            "cardNum":111111111,
            "orderid":"5cd4c6d7795b81b93e079423"
        }
        chai.request(rooturl)
        .post('/makePayment')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })
    it("Test Case 2 - User should not be able to pay if balance is insufficient", (done) => {

        //sample data
        var data={
            "email":"sample@sample.com",
            "cardNum":111111111,
            "orderid":"5cd4c6d7795b81b93e079423"
        }
        chai.request(rooturl)
        .post('/makePayment')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(400);
        done();
        });
    })
})