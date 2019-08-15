/* eslint-disable max-len */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
let pcode;

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /ping', () => {
  describe('should return pong', () => {
    it('responds with status 200', function(done) {
      chai.request('http://localhost:3000')
          .get('/ping')
          .then(function(res) {
            expect(res).to.have.status(200);
            done();
          })
          .catch(function(err) {
            done(err);
          });
    });
  });
});


describe('POST /register', () => {
  describe('should register and get unique code', () => {
    it(`users registered and code received`, function(done) {
      chai.request('http://localhost:3000')
          .post('/register')
          .send({serverurl: 'server.rocket.chat', servername: 'server', userid: 'oI1pwo007k69', token: '143uuioep2786uiop8008'})
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res.body.code).to.not.be.null;
            pcode = res.body.code;
            expect(res.body.expiry).to.equal(5);
            expect(res.body.status).to.be.true;
            done();
          })
          .catch(function(err) {
            done(err);
          });
    });
  });

  describe('should fail if missing param', () => {
    it('returns error', function(done) {
      chai.request('http://localhost:3000')
          .post('/register')
          .send({servername: 'bots', userid: 'FpaaN9jwwJT9ts', token: 'E6XKwshBE0NRHQzdlw6XDnUQdZumpTfP8R3cb3'})
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.not.be.null;
            expect(res.body.status).to.be.false;
            done();
          })
          .catch(function(err) {
            done(err);
          });
    });
  });
});

describe('GET /user/data?:qcode', () => {
  describe('should get correct data from code', () => {
    it('responds with user data', function(done) {
      chai.request('http://localhost:3000')
          .get(`/user/data?qcode=${pcode}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res.body.data.serverinfo).to.not.be.null;
            expect(res.body.data.headers).to.not.be.null;
            expect(res.body.data._id).to.not.be.null;
            expect(res.body.data.expireAt).to.not.be.null;
            expect(res.body.data.__v).to.not.be.null;
            expect(res.body.status).to.be.true;
            done();
          })
          .catch(function(err) {
            done(err);
          });
    });
  });

  describe('should fail with bogus number', () => {
    it('returns error', function(done) {
      chai.request('http://localhost:3000')
          .get(`/user/data?qcode=${pcode-10}`)
          .then(function(res) {
            expect(res).to.have.status(404);
            expect(res.body.message).to.not.be.null;
            expect(res.body.status).to.be.false;
            done();
          })
          .catch(function(err) {
            done(err);
          });
    });
  });
});
