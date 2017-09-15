import supertest from 'supertest';
import should from 'should';
import jwtDecode from 'jwt-decode';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import { updateInfo } from './../seeders/groupSeeds';
import newGroupMembers from './../seeders/userSeeds';
import message from './../seeders/messageSeeds';

const server = supertest.agent(app);

describe('Users Route', () => {
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

  it('allows a user/admin to get all users', (done) => {
    server
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('prevents a user/admin from being re-added to a group if already a member', (done) => {
    server
    .post('/api/v1/group/2/user')
    .set('Authorization', `Bearer ${token}`)
    .send(newGroupMembers[1])
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.globals.should.equal('Selected users are already members of this group');
      done();
    });
  });

  it('allows an admin to add other users to his group', (done) => {
    server
    .post('/api/v1/group/2/user')
    .set('Authorization', `Bearer ${token}`)
    .send(newGroupMembers[2])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('new users added successfully');
      done();
    });
  });

  it('allows an admin to multiple users to his group', (done) => {
    server
    .post('/api/v1/group/3/user')
    .set('Authorization', `Bearer ${token}`)
    .send(newGroupMembers[4])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('new users added successfully');
      done();
    });
  });

  it('prevents an unregistered user from being added to a group', (done) => {
    server
    .post('/api/v1/group/3/user')
    .set('Authorization', `Bearer ${token}`)
    .send(newGroupMembers[3])
    .expect(404)
    .end((err, res) => {
      res.status.should.equal(404);
      res.body.globals.should.equal('User not found');
      done();
    });
  });

  it('allows a user to get all users in a group he belongs', (done) => {
    server
    .get('/api/v1/group/3/users')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/api/v1/user/login')
    .set('Authorization', `Bearer ${token}`)
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

  it('allows a non-admins to post messages in group he belongs', (done) => {
    server
    .post('/api/v1/group/3/message')
    .set('Authorization', `Bearer ${token}`)
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
    .post('/api/v1/group/3/user')
    .set('Authorization', `Bearer ${token}`)
    .send(newGroupMembers[0])
    .expect(403)
    .end((err, res) => {
      res.status.should.equal(403);
      res.body.globals.should.equal('You are not allowed to add new users to this group, please contact admin!');
      done();
    });
  });

  it('prevent non-admins from editing member group details', (done) => {
    server
    .put('/api/v1/group/3/edit')
    .set('Authorization', `Bearer ${token}`)
    .send(updateInfo)
    .expect(403)
    .end((err, res) => {
      res.status.should.equal(403);
      res.body.globals.should.equal('You do not have permission to edit this group\'s details');
      done();
    });
  });

  it('allows a group admin to delete the group he owns', (done) => {
    server
    .delete('/api/v1/group/3/delete')
    .set('Authorization', `Bearer ${token}`)
    .expect(403)
    .end((err, res) => {
      res.status.should.equal(403);
      res.body.globals.should.equal('You do not have permission to delete this group');
      done();
    });
  });
});
