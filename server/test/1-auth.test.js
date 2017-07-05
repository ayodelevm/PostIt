import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../../app';
import models from '../models/index';
import { user, loginUser, invalidUser, incorrectPassword, invalidEmail } from './../seeders/authSeeds';

const server = supertest.agent(app);


before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Authentication', () => {
  it('prevents accessing an undefined route', (done) => {
    server
    .get('/api/post')
    .expect(501)
    .end((err, res) => {
      res.body.message.should.equal('Sorry, this address is not supported by this API.');
      done();
    });
  });

  it('prevents access to other routes if not logged in', (done) => {
    server
      .get('/api/group')
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('You need to be logged in to do that!');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[0])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.should.equal('tundun');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[1])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.should.equal('lolade');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[2])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.should.equal('bolu');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[3])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.should.equal('jide');
        done();
      });
  });

  it('should ensure that username is unique', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[1])
      .expect(500)
      .end((err, res) => {
        res.status.should.equal(500);
        res.body.error.should.equal('User already exists with lolade');
        done();
      });
  });

  it('validates email during registration', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidEmail)
      .expect(500)
      .end((err, res) => {
        res.status.should.equal(500);
        res.body.error.should.equal('Invalid Email.');
        done();
      });
  });
});

describe('Authentication', () => {
  it('prevents an invalid user from logging in', (done) => {
    server
      .post('/api/user/login')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUser)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.message.should.equal('Incorrect username');
        done();
      });
  });

  it('prevents a user with a wrong password from logging in', (done) => {
    server
      .post('/api/user/login')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(incorrectPassword)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.message.should.equal('Incorrect password');
        done();
      });
  });

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/api/user/login')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(loginUser[0])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.user.should.equal('lolade');
      done();
    });
  });

  it('allows a loggedin user to logout successfully', (done) => {
    server
    .get('/api/user/logout')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.message.should.equal('Logged out successfully');
      done();
    });
  });
});
