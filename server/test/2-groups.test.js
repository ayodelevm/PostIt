import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import { groupDetails, updateInfo, noGrpName } from './../seeders/groupSeeds';

const server = supertest.agent(app);

describe('Group Routes', () => {
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

  it('allows a logged in user to create a new group', (done) => {
    server
    .post('/api/group')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(groupDetails[0])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New group created successfully.');
      done();
    });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
    .post('/api/group')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(groupDetails[1])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New group created successfully.');
      done();
    });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
    .post('/api/group')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(groupDetails[2])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New group created successfully.');
      done();
    });
  });

  it('allows a logged in user to get all the groups he belongs to', (done) => {
    server
    .get('/api/groups')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a group admin to get one group details for editing', (done) => {
    server
    .get('/api/group/2/edit')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('ensures that a group has a name when updating', (done) => {
    server
    .put('/api/group/2/edit')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(noGrpName)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.error.should.equal('A group needs to have a name');
      done();
    });
  });

  it('allows a group admin to edit the group details', (done) => {
    server
    .put('/api/group/2/edit')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(updateInfo)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Group details updated successfully.');
      done();
    });
  });

  it('allows a group admin to delete the group he owns', (done) => {
    server
    .delete('/api/group/1/delete')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Group deleted successfully.');
      done();
    });
  });

  it('allows another registered user to login successfully', (done) => {
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

  it('ensures that a group has a name', (done) => {
    server
    .post('/api/group')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(noGrpName)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.error.should.equal('A new group needs to have a name');
      done();
    });
  });

  it('ensures that group name is unique', (done) => {
    server
    .post('/api/group')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(groupDetails[2])
    .expect(500)
    .end((err, res) => {
      res.status.should.equal(500);
      res.body.error.should.equal('name must be unique');
      done();
    });
  });


  it('prevents a user from editing a group he is not a member of', (done) => {
    server
    .put('/api/group/2/edit')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(updateInfo)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.error.should.equal('You are not authorized to access this group!');
      done();
    });
  });

  it('prevents a user from deleting a group he is not a member of', (done) => {
    server
    .delete('/api/group/1/delete')
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.error.should.equal('You are not authorized to access this group!');
      done();
    });
  });
});
