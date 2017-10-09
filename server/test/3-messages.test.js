import supertest from 'supertest';
import should from 'should';
import jwtDecode from 'jwt-decode';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import message from './../seeders/messageSeeds';

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

  it('allows a group member to post messages in group he belongs', (done) => {
    server
    .post('/api/v1/group/2/message')
    .set('Authorization', `Bearer ${token}`)
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
    .post('/api/v1/group/3/message')
    .set('Authorization', `Bearer ${token}`)
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
    .post('/api/v1/group/3/message')
    .set('Authorization', `Bearer ${token}`)
    .send({ message: null })
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.globals.should.equal('Message cannot be empty');
      done();
    });
  });
});
