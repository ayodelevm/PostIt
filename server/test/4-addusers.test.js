import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import { updateInfo } from './../seeders/groupSeeds';
import idToAdd from './../seeders/adduserSeeds';
import message from './../seeders/messageSeeds';

const server = supertest.agent(app);

describe('Add Users Route', () => {
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

  it('allows a user/admin to get all users', (done) => {
    server
    .get('/api/users')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows an admin to add other users to his group', (done) => {
    server
    .post('/api/group/2/user')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(idToAdd[0])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows an admin to add other users to his group', (done) => {
    server
    .post('/api/group/2/user')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(idToAdd[1])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows an admin to add other users to his group', (done) => {
    server
    .post('/api/group/3/user')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(idToAdd[1])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows an admin to add other users to his group', (done) => {
    server
    .post('/api/group/3/user')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(idToAdd[2])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a user to get all users in a group he belongs', (done) => {
    server
    .get('/api/group/3/users')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/api/user/login')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(loginUser[1])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.user.should.equal('jide');
      done();
    });
  });

  it('allows a non-admins to post messages in group he belongs', (done) => {
    server
    .post('/api/group/3/message')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(message[2])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New message added successfully.');
      done();
    });
  });

  it('prevents non admins from adding new users to group', (done) => {
    server
    .post('/api/group/3/user')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(idToAdd[0])
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.error.should.equal('You are not allowed to add new users to this group, please contact admin!');
      done();
    });
  });

  it('prevent non-admins from editing member group details', (done) => {
    server
    .put('/api/group/3/edit')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(updateInfo)
    .expect(401)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.error.should.equal('You do not have permission to edit this group\'s details');
      done();
    });
  });

  it('allows a group admin to delete the group he owns', (done) => {
    server
    .delete('/api/group/3/delete')
    .expect(401)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.error.should.equal('You do not have permission to delete this group');
      done();
    });
  });
});
