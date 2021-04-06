/* eslint-disable no-undef */


const request = require('supertest')
const app = require('../src/app')
const { expect } =  require('chai')
const { StatusCodes } = require('http-status-codes')
const TIMEOUT = 30000
describe('GET /health', function() {
    it('responds with 200 status and json', function(done) {
      request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK)
        .end(function(err, res) {
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('version')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('env')
          expect(res.body).to.have.property('stats')
          expect(res.body).to.have.property('keys')
          return done();
        })
    });
  }).timeout(TIMEOUT)


describe('POST /subscribe/:topic', function() {
  it('fails with 400 BAD_REQUEST', function(done) {
    request(app)
      .post('/subscribe/topic')
      .send({ url: "https google dot com"})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .end(function(err, res ) {
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('errors')
        if (err) return done(err);
        return done();
      })
  }).timeout(TIMEOUT)

  describe('GET /subscribers/:topic', function() {

    it('returns empty response 204', function(done) {
      request(app)
        .get('/subscribers/randomtopic')
        .set('Accept', 'application/json')
        .expect(StatusCodes.NO_CONTENT)
        .end(function (err, res) {
          expect(res.body).to.be.empty
          return done()
        })
    })
  }).timeout(TIMEOUT)


describe('POST /publish/:topic', function() {
  it('fails with 400 BAD_REQUEST', function(done) {
    request(app)
      .post('/publish/1')
      .send({ dat: "incorrect field"})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .end(function(err, res) {
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('errors')
        if (err) return done(err);
        return done();
      })
  }).timeout(TIMEOUT)
})

})