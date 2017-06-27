import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import models from '../models/index';
import { user, loginUser, invalidUser } from './../seeders/authSeeds';

const server = supertest.agent(app);


before((done) => {
  models.User.sync().then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Authentication', () => {
  afterEach((done) => {
    models.User.sync({ force: true })
      .then(() => {
        done(null);
      }).catch((errors) => {
        done(errors);
      });
  });

  it('prevents accessing an undefined route', (done) => {
    server
    .get('/api/post')
    .expect(501)
    .end((err, res) => {
      res.body.message.should.equal('Sorry, this route is not supported by this API.');
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
});

describe('Authentication', () => {
  after((done) => {
    models.User.sync({ force: true })
      .then(() => {
        done(null);
      }).catch((errors) => {
        done(errors);
      });
  });

  it('prevents an invalid user from logging in', (done) => {
    server
      .post('/api/user/login')
      .send(invalidUser)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('User not found.');
        res.body.error.message.should.equal('Incorrect username');
        done();
      });
  });

  it('allows a new user to create account and login later', (done) => {
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

  it('prevents a user with a wrong password from logging in', (done) => {
    server
      .post('/api/user/login')
      .send(loginUser[1])
      .expect(501)
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
