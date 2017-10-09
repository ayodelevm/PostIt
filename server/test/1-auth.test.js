import supertest from 'supertest';
import sinon from 'sinon';
import nodemailer from 'nodemailer';
import should from 'should';
import jwtDecode from 'jwt-decode';
import app from './../app';
import models from '../models/index';
import * as authSeeds from './../seeders/authSeeds';

const server = supertest.agent(app);


before((done) => {
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
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
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
    this.timeout(10000);
    server
      .post('/api/v1/user/register')
      .send(authSeeds.user[0])
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
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
      .send(authSeeds.user[1])
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.telephone.should.equal('Mobile number is invalid');
        res.body.errors.email.should.equal('Email is invalid');
        done();
      });
  });

  it('should confirm password on signup', (done) => {
    server
      .post('/api/v1/user/register')
      .send(authSeeds.user[2])
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.passwordConfirmation.should.equal("Passwords don't match");
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/register')
      .send(authSeeds.user[3])
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
      .send(authSeeds.user[4])
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
      .send(authSeeds.user[5])
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
      .send(authSeeds.user[6])
      .expect(201)
      .end((err, res) => {
        const decodedUser = jwtDecode(res.body.token);
        res.status.should.equal(201);
        decodedUser.username.should.equal('jide');
        done();
      });
  });

  it('should fail on invalid id_token from client', (done) => {
    server
      .post('/api/v1/user/googlesignup')
      .send(authSeeds.user[8])
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('Email verification Unsuccessful, Please signup with a valid email');
        done();
      });
  });

  it('should fail if id_token was not sent from client', (done) => {
    server
      .post('/api/v1/user/googlesignup')
      .send(authSeeds.user[9])
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('Google signup failed, please try again later!');
        done();
      });
  });

  it('should ensure that username and email is unique', (done) => {
    server
      .post('/api/v1/user/register')
      .send(authSeeds.user[3])
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.username.should.equal('username is not available');
        res.body.errors.email.should.equal('email is not available');
        done();
      });
  });
});

describe('Login Authentication', () => {
  let token;
  it('prevents login with empty data', (done) => {
    server
      .post('/api/v1/user/login')
      .send(authSeeds.loginUser[2])
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.userIdentifier.should.equal('This field is required');
        res.body.errors.password.should.equal('This field is required');
        done();
      });
  });

  it('prevents an invalid user from logging in', (done) => {
    server
      .post('/api/v1/user/login')
      .send(authSeeds.invalidUser)
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
      .send(authSeeds.incorrectPassword)
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
    .send(authSeeds.loginUser[0])
    .expect(200)
    .end((err, res) => {
      token = res.body.token;
      const decodedUser = jwtDecode(res.body.token);
      res.status.should.equal(200);
      decodedUser.username.should.equal('lolade');
      done();
    });
  });

  it('verifies the authenticity of user token on page reload', (done) => {
    server
    .post('/api/v1/verifyuser')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('user verification successful!');
      done();
    });
  });

  it('should fail on invalid id_token', (done) => {
    server
      .post('/api/v1/user/googlelogin')
      .send(authSeeds.loginUser[5])
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('Email verification Unsuccessful, Please signin with a valid email');
        done();
      });
  });

  it('should fail if id_token was not sent', (done) => {
    server
      .post('/api/v1/user/googlelogin')
      .send(authSeeds.loginUser[6])
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('Google sigin failed, please try again later!');
        done();
      });
  });
});

describe('password Reset', () => {

  it('sends a reset password link to email on success', (done) => {
    const stub = sinon.stub(nodemailer, 'createTransport');
    stub.returns({
      sendMail: (mailOptions = {}, cb) => cb('')
    });
    server
      .post('/api/v1/user/forgotpassword')
      .send(authSeeds.resetEmail)
      .expect(200)
      .end((err, res) => {
        stub.restore();
        res.status.should.equal(200);
        res.body.success.should.equal('Please check your mail for the reset link!');
        done();
      });
  });

  it('validates that email is not empty', (done) => {
    server
      .post('/api/v1/user/forgotpassword')
      .send(authSeeds.resetEmailEmpty)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.email.should.equal('This field is required');
        done();
      });
  });

  it('validates that email is not invalid', (done) => {
    server
      .post('/api/v1/user/forgotpassword')
      .send(authSeeds.resetEmailInvalid)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.email.should.equal('Email is invalid');
        done();
      });
  });

  it('indicate if email not sent', (done) => {
    const stub = sinon.stub(nodemailer, 'createTransport');
    stub.returns({
      sendMail: (mailOptions = {}, cb) => cb('This is error')
    });
    server
      .post('/api/v1/user/forgotpassword')
      .send(authSeeds.resetEmail)
      .expect(422)
      .end((err, res) => {
        stub.restore();
        should.exist(err);
        res.body.globals.should.equal('Mail not sent');
        done();
      });
  });

  it('validates that email exist on request to reset password', (done) => {
    server
      .post('/api/v1/user/forgotpassword')
      .send(authSeeds.notFoundResetEmail)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.globals.should.equal("There's no registered user with this email");
        done();
      });
  });

  it('validates that password and confirm password are not empty', (done) => {
    server
      .put(`/api/v1/resetpassword?tok=${authSeeds.validToken.token}`)
      .send(authSeeds.emptyResetPasswords)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.password.should.equal('This field is required');
        res.body.errors.passwordConfirmation.should.equal('This field is required');
        done();
      });
  });

  it('validates that password and confirm password are the same', (done) => {
    server
      .put(`/api/v1/resetpassword?tok=${authSeeds.validToken.token}`)
      .send(authSeeds.wrongResetPasswords)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.errors.passwordConfirmation.should.equal("Passwords don't match");
        done();
      });
  });

  it('validates that reset token is not expired', (done) => {
    server
      .put(`/api/v1/resetpassword?tok=${authSeeds.expiredToken.token}`)
      .send(authSeeds.resetPasswords)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.globals.should.equal('This link has expired or is invalid. Please try again');
        done();
      });
  });

  it('resets users password when correct data are provided', (done) => {
    server
      .put(`/api/v1/resetpassword?tok=${authSeeds.validToken.token}`)
      .send(authSeeds.resetPasswords)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal('password reset successful, Please login to continue!');
        done();
      });
  });
});
