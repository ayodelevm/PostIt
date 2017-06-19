import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import User from '../models/user';
// import users from './../../seed/users.json';

const server = supertest.agent(app);
const user = {
  username: 'tundun',
  password: 'tundun05',
  email: 'tundun05@gmail.com',
  fullName: 'tundun oluwalonimi'
};

// beforeEach(() => {
//   User.sync();
// });

afterEach(() => {
  User.sync({ force: true });
  User.sync();
});

describe('Authentication', () => {
  it('allows a registered user to login', (done) => {
    server
      .post('/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user)
      .expect(200)
      .end((err, res, req) => {
        res.status.should.equal(302);
        res.body.username.should.equal('tundun');
        req.user.dataValues.username.should.equal('tundun');
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
