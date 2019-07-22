'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
let pcode;

chai.use(chaiHttp);

describe('GET /ping', () => {
  describe('should return pong', () => {
    it('responds with status 200', function(done) {
      chai.request('http://localhost:3000')
          .get('/ping')
          .end(function(err, res) {
            // console.log(res.body);
            expect(res).to.have.status(200);
            done();
          });
    });
  });
});

describe('POST /register', () => {
  describe('should register and get unique code', () => {
    it('returns code', function(done) {
      chai.request('http://localhost:3000')
          .post('/register')
          .send({serverurl: 'https://bots.rocket.chat', servername: 'bots', userid: 'FpaaN9jwwJT9ts', token: 'E6XKwshBE0NRHQzdlw6XDnUQdZumpTfP8R3cb3'})
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.code).to.not.be.null;
            pcode = res.body.code;
            expect(res.body.expiry).to.equal(5);
            expect(res.body.status).to.be.true;
            done();
          });
    });
  });

  describe('should fail if missing param', () => {
    it('returns error', function(done) {
      chai.request('http://localhost:3000')
          .post('/register')
          // eslint-disable-next-line max-len
          .send({servername: 'bots', userid: 'FpaaN9jwwJT9ts', token: 'E6XKwshBE0NRHQzdlw6XDnUQdZumpTfP8R3cb3'})
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.not.be.null;
            expect(res.body.status).to.be.false;
            done();
          });
    });
  });

  // describe('should fail if code exists', () => {

  //     it('returns error', function (done) {
  //         chai.request("http://localhost:3000")
  //             .post("/register")
  //             .send({serverurl: "https://bots.rocket.chat", servername: "bots",  userid: "FpaaN9jwwJT9ts", token: "E6XKwshBE0NRHQzdlw6XDnUQdZumpTfP8R3cb3"})
  //             .end(function (err, res) {
  //                 expect(err).to.be.null;
  //                 expect(res).to.have.status(500);
  //                 expect(res.body.message).to.not.be.null;
  //                 expect(res.body.status).to.be.false;
  //                 done();
  //             });
  //     });
  // });
});

describe('GET /user/data?:qcode', () => {
  describe('should get correct data from code', () => {
    it('responds with user data', function(done) {
      chai.request('http://localhost:3000')
          .get(`/user/data?qcode=${pcode}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.data.serverinfo).to.not.be.null;
            expect(res.body.data.headers).to.not.be.null;
            expect(res.body.data._id).to.not.be.null;
            expect(res.body.data.expireAt).to.not.be.null;
            expect(res.body.data.__v).to.not.be.null;
            expect(res.body.status).to.be.true;
            done();
          });
    });
  });

  describe('should fail with bogus number', () => {
    it('returns error', function(done) {
      chai.request('http://localhost:3000')
          .get(`/user/data?qcode=${pcode-10}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body.message).to.not.be.null;
            expect(res.body.status).to.be.false;
            done();
          });
    });
  });
});
