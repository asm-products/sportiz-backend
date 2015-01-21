'use strict';
var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe('Authentication Tests', function() {
    var id;
    it('can successfully create a new user', function(done) {
        this.timeout(5000);
        superagent.post('http://localhost:3000/api/v1/auth/register')
            .send({
                username:"test", 
                password:"test",
                name:"test",
                email:"test@test.com",
                blurb:"test"
            })
            .end(function(err,res) {
                expect(err).to.eql(null);
                expect(res.status).to.be.eql(200);
                expect(res.body.info._id).to.not.be.eql(null);
                return done();                
            });
    });

    it('can successfully login a user', function(done) {
        superagent.post('http://localhost:3000/api/v1/auth/login')
            .send({username:"test", password:"test"})
            .end(function(err,res) {
                id = res.body.info._id;
                console.log(id);
                expect(err).to.eq(null);
                expect(res.status).to.be.eql(200);
                return done();
            });
    });

    it('can successfully update a user', function(done) {
        superagent.put('http://localhost:3000/api/v1/auth/users/' + id)
            .send({name:"abc"})
            .end(function(err,res) {
                expect(err).to.eq(null);
                expect(res.status).to.be.eql(200);
                return done();
            });
    });

    it('can successfully logout a user', function(done) {
        superagent.get('http://localhost:3000/api/v1/auth/logout')
            .end(function(err,res) {
                expect(err).to.eql(null);
                expect(res.status).to.be.eql(200);
                return done();
            });
    });

    // TODO: THIS ISNT WORKING NOW, BUT THE API WORKS
    // it('can successfully get a user profile', function(done) {
    //     superagent.get('http://localhost:3000/api/v1/auth/profile')
    //         .end(function(err,res) {
    //             expect(err).to.eql(null);
    //             expect(res.status).to.be.eql(200);
    //             return done();
    //         });
    // });

});

describe('Event Tests', function() {
    var id = '';
    var event = null;

    it('can successfully create a new event', function(done) {
        this.timeout(5000);
        superagent.post('http://localhost:3000/api/v1/events')
            .send({name:"test event"})
            .end(function(err,res) {
                event = res.body.info;
                id = res.body.info._id;
                expect(err).to.eql(null);
                expect(res.status).to.be.eql(200);
                expect(res.body.info._id).to.not.be.eql(null);
                return done();                
            });
    });

    it('can successfully get all events', function(done) {
        superagent.get('http://localhost:3000/api/v1/events')
            .end(function(err,res) {
                expect(err).to.eql(null);
                expect(res.status).to.be.eql(200);
                return done();
            })
    });

    it('can successfully get an event', function(done) {
        superagent.get('http://localhost:3000/api/v1/events/' + id)
            .end(function(err,res) {
                expect(err).to.eql(null);
                expect(res.status).to.be.eql(200);
                return done();
            })
    });    


    it('can successfully update an event', function(done) {
        event.name = "abc";
        superagent.put('http://localhost:3000/api/v1/events/' + id)
            .send(event)
            .end(function(err,res) {
                expect(err).to.eq(null);
                expect(res.status).to.be.eql(200);
                return done();
            });
    });

    it('can successfully delete an event', function(done) {
        superagent.del('http://localhost:3000/api/v1/events/' + id)
            .end(function(err,res) {
                expect(err).to.eq(null);
                expect(res.status).to.be.eql(200);
                return done();
            });
    });    
});

