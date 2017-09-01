import supertest from 'supertest';
import should from 'should';
import jwtDecode from 'jwt-decode';
import app from './../app';
import models from '../models/index';
import { user, loginUser, invalidUser, incorrectPassword } from './../seeders/authSeeds';

const server = supertest.agent(app);


after((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Signup Authentication', () => {
  it('prevents access to other routes if not a registered user', (done) => {
    server
      .get('/api/v1/groups')
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.globals.should.equal('Access denied! Please create an account or login first!');
        done();
      });
  });

  it('prevents access to other routes if not logged in', (done) => {
    server
      .get('/api/v1/groups')
      .set('Authorization', 'yh784349337hdse.4347ajdhsbcdbHJBUYDSDC')
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('You need to be logged first!');
        done();
      });
  });

  it('prevents signing up with empty data', function (done) {
    this.timeout(5000);
    server
      .post('/api/v1/user/register')
      .send(user[0])
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.fullname.should.equal('This field is required');
        res.body.errors.username.should.equal('This field is required');
        res.body.errors.telephone.should.equal('This field is required');
        res.body.errors.password.should.equal('This field is required');
        res.body.errors.email.should.equal('This field is required');
        done();
      });
  });

  it('should validate user input on signup', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[1])
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.telephone.should.equal('Mobile number is invalid');
        res.body.errors.email.should.equal('Email is invalid');
        done();
      });
  });

  it('should confirm paswword on signup', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[2])
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.passwordConfirmation.should.equal("Passwords don't match");
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[3])
      .expect(201)
      .end((err, res) => {
        const decodedUser = jwtDecode(res.body.token);
        res.status.should.equal(201);
        decodedUser.username.should.equal('tundun');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[4])
      .expect(201)
      .end((err, res) => {
        const decodedUser = jwtDecode(res.body.token);
        res.status.should.equal(201);
        decodedUser.username.should.equal('lolade');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[5])
      .expect(201)
      .end((err, res) => {
        const decodedUser = jwtDecode(res.body.token);
        res.status.should.equal(201);
        decodedUser.username.should.equal('bolu');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[6])
      .expect(201)
      .end((err, res) => {
        const decodedUser = jwtDecode(res.body.token);
        res.status.should.equal(201);
        decodedUser.username.should.equal('jide');
        done();
      });
  });

  it('should ensure that username and email is unique', (done) => {
    server
      .post('/api/v1/user/register')
      .send(user[3])
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.username.should.equal('username is not available');
        res.body.errors.email.should.equal('email is not available');
        done();
      });
  });
});

describe('Login Authentication', () => {
  it('prevents login with empty data', (done) => {
    server
      .post('/api/v1/user/login')
      .send(loginUser[2])
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.userIdentifier.should.equal('This field is required');
        res.body.errors.password.should.equal('This field is required');
        done();
      });
  });

  it('prevents an invalid user from logging in', (done) => {
    server
      .post('/api/v1/user/login')
      .send(invalidUser)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('Invalid login credentials');
        done();
      });
  });

  it('prevents a user with a wrong password from logging in', (done) => {
    server
      .post('/api/v1/user/login')
      .send(incorrectPassword)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('Invalid login credentials');
        done();
      });
  });

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/api/v1/user/login')
    .send(loginUser[0])
    .expect(200)
    .end((err, res) => {
      const decodedUser = jwtDecode(res.body.token);
      res.status.should.equal(200);
      decodedUser.username.should.equal('lolade');
      done();
    });
  });
});
