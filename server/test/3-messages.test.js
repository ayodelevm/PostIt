import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import message from './../seeders/messageSeeds';

const server = supertest.agent(app);

describe('Messages Routes', () => {
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

  it('allows a group member to get one group and it\'s messages', (done) => {
    server
    .get('/api/group/2/messages')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a group member to post messages in group he belongs', (done) => {
    server
    .post('/api/group/2/message')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(message[0])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New message added successfully.');
      done();
    });
  });

  it('allows a group member to post messages in group he belongs', (done) => {
    server
    .post('/api/group/3/message')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(message[0])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New message added successfully.');
      done();
    });
  });

  it('should ensure that messages are not empty', (done) => {
    server
    .post('/api/group/3/message')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send({ message: null })
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.error.should.equal('Message cannot be empty');
      done();
    });
  });
});
