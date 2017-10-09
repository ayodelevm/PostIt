import supertest from 'supertest';
import should from 'should';
import jwtDecode from 'jwt-decode';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import * as messageSeeds from './../seeders/messageSeeds';

const server = supertest.agent(app);

describe('Messages Routes', () => {
  let token;

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/api/v1/user/login')
    .send(loginUser[0])
    .expect(200)
    .end((err, res) => {
      token = res.body.token;
      const decodedUser = jwtDecode(res.body.token);
      res.status.should.equal(200);
      decodedUser.username.should.equal('lolade');
      done();
    });
  });

  it('allows a group member to get one group and it\'s messages', (done) => {
    server
    .get('/api/v1/group/2/messages')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a group member to post messages with priority Normal', (done) => {
    server
    .post('/api/v1/group/2/message')
    .set('Authorization', `Bearer ${token}`)
    .send(messageSeeds.messages[0])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New message added successfully.');
      done();
    });
  });

  it('post messages with priority urgent and sends mail', (done) => {
    server
    .post('/api/v1/group/2/message')
    .set('Authorization', `Bearer ${token}`)
    .send(messageSeeds.messages[1])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New message added successfully.');
      done();
    });
  });

  it('post messages with priority critical and sends sms and email',
  (done) => {
    server
    .post('/api/v1/group/3/message')
    .set('Authorization', `Bearer ${token}`)
    .send(messageSeeds.messages[2])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should
      .equal('New message added successfully.');
      done();
    });
  });

  it('should ensure that messages are not empty', (done) => {
    server
    .post('/api/v1/group/3/message')
    .set('Authorization', `Bearer ${token}`)
    .send({ message: null })
    .expect(422)
    .end((err, res) => {
      res.status.should.equal(422);
      res.body.globals.should.equal('Message cannot be empty');
      done();
    });
  });

  it('validate that array of ids to archive is not empty', (done) => {
    server
    .put('/api/v1/group/2/archivemessages')
    .set('Authorization', `Bearer ${token}`)
    .send(messageSeeds.emptyMessageIds)
    .expect(422)
    .end((err, res) => {
      res.status.should.equal(422);
      res.body.globals.should
      .equal('There are no messages to archive in this group!');
      done();
    });
  });

  it('allows a group admin to archive messages in the group', (done) => {
    server
    .put('/api/v1/group/2/archivemessages')
    .set('Authorization', `Bearer ${token}`)
    .send(messageSeeds.validMessageIds)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should
      .equal('Messages have been archived successfully');
      done();
    });
  });

  it('throws an error if message id does not exist', (done) => {
    server
    .put('/api/v1/group/2/archivemessages')
    .set('Authorization', `Bearer ${token}`)
    .send(messageSeeds.nonExistId)
    .expect(404)
    .end((err, res) => {
      res.status.should.equal(404);
      res.body.globals.should.equal('Messages not found');
      done();
    });
  });

  it('allows another registered user to login successfully', (done) => {
    server
    .post('/api/v1/user/login')
    .send(loginUser[1])
    .expect(200)
    .end((err, res) => {
      token = res.body.token;
      const decodedUser = jwtDecode(res.body.token);
      res.status.should.equal(200);
      decodedUser.username.should.equal('jide');
      done();
    });
  });
});
