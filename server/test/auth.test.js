import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import User from '../models/user';
// import users from './../../seed/users.json';

const server = supertest.agent(app);
const user = [{
  username: 'tundun',
  password: 'tundun05',
  email: 'tundun05@gmail.com',
  fullName: 'tundun oluwalonimi'
}, {
  username: 'lolade',
  password: 'lolade05',
  email: 'lolade05@gmail.com',
  fullName: 'lolade toluwanimi'
}];
const loginUser = {
  username: 'lolade',
  password: 'lolade05'
};

beforeAll((done) => {
  User.sync().then(() => {
    done();
  }).catch((errors) => {
    done(errors);
  });
});

describe('Authentication', () => {
  // beforeEach((done) => {
  //   User.sync().then(() => {
  //     done();
  //   });
  // });

  afterEach((done) => {
    User.sync({ force: true })
      .then(() => {
        done(null);
      }).catch((errors) => {
        done(errors);
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[0])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.should.equal('tundun');
        // res.body.email.should.equal('tundun05@gmail.com');
        done();
      });
  });

  // const invalidUser = {
  //   username: 'test',
  //   password: 1234
  // };

  // it('prevents an invalid user from logging in', (done) => {
  //   server
  //     .post('/api/users/login')
  //     .send(invalidUser)
  //     .expect(404)
  //     .end((err, res) => {
  //       res.status.should.equal(404);
  //       res.body.message.should.equal('Authentication failed. User not found.');
  //       done();
  //     });
  // });

  // const wrongPasswordUser = {
  //   username: 'pescobar',
  //   password: '1234'
  // };

  // it('prevents a user with a wrong password from logging in', (done) => {
  //   server
  //     .post('/api/users/login')
  //     .send(wrongPasswordUser)
  //     .expect(403)
  //     .end((err, res) => {
  //       res.status.should.equal(403);
  //       res.body.message.should.equal('Authentication failed. Wrong password.');
  //       done();
  //     });
  // });

  // it('allows for logging users out', (done) => {
  //   server
  //     .post('/api/users/logout')
  //     .expect(200)
  //     .end((err, res) => {
  //       res.status.should.equal(200);
  //       res.body.message.should.equal('Logged out successfully.');
  //       done();
  //     });
  // });
});

describe('Authentication', () => {
  afterAll((done) => {
    User.sync({ force: true })
      .then(() => {
        done(null);
      }).catch((errors) => {
        done(errors);
      });
  });

  it('allows a new user to create account and login later', (done) => {
    server
      .post('/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[1])
      .expect(200)
      .end((err, res) => {
        done();
      });
  });

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/login')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(loginUser)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.user.should.equal('lolade');
      done();
    });
  });

  it('allows a loggedin user to logout successfully', (done) => {
    server
    .get('/logout')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.message.should.equal('Logged out successfully');
      done();
    });
  });
});
