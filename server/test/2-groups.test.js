import supertest from 'supertest';
import should from 'should';
import jwtDecode from 'jwt-decode';
import app from './../app';
import { loginUser } from './../seeders/authSeeds';
import { groupDetails, updateInfo, noGrpName } from './../seeders/groupSeeds';

const server = supertest.agent(app);

describe('Group Routes', () => {
  let token;

  it('allows a registered user to login successfully', (done) => {
    server
    .post('/api/v1/user/login')
    .send(loginUser[0])
    .expect(200)
    .end((err, res) => {
      token = res.body.token;
      res.status.should.equal(200);
      res.body.token.should.equal(token);
      done();
    });
  });

  it('prevents user from creating a group without a name', (done) => {
    server
      .post('/api/v1/group')
      .set('Authorization', `Bearer ${token}`)
      .send(noGrpName)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.name.should.equal('This field is required');
        done();
      });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
    .post('/api/v1/group')
    .set('Authorization', `Bearer ${token}`)
    .send(groupDetails[0])
    .expect(201)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New group created successfully.');
      done();
    });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
    .post('/api/v1/group')
    .set('Authorization', `Bearer ${token}`)
    .send(groupDetails[1])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New group created successfully.');
      done();
    });
  });

  it('allows a logged in user to create a new group and add other users while creating', (done) => {
    server
    .post('/api/v1/group')
    .set('Authorization', `Bearer ${token}`)
    .send(groupDetails[3])
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(201);
      res.body.success.should.equal('New group created successfully.');
      done();
    });
  });

  it('allows a logged in user to get all the groups he belongs to', (done) => {
    server
    .get('/api/v1/groups')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('allows a group admin to get one group details for editing', (done) => {
    server
    .get('/api/v1/group/2/edit')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
      done();
    });
  });

  it('ensures that a group has a name when updating', (done) => {
    server
    .put('/api/v1/group/2/edit')
    .set('Authorization', `Bearer ${token}`)
    .send(noGrpName)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.globals.should.equal('A group needs to have a name');
      done();
    });
  });

  it('allows a group admin to edit the group details', (done) => {
    server
    .put('/api/v1/group/2/edit')
    .set('Authorization', `Bearer ${token}`)
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
    .delete('/api/v1/group/1/delete')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Group deleted successfully.');
      done();
    });
  });

  it('allows another registered user to login successfully', (done) => {
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

  it('should ensure that group names are unique', (done) => {
    server
      .post('/api/v1/group')
      .set('Authorization', `Bearer ${token}`)
      .send(groupDetails[2])
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.errors.name.should.equal('A group with this name already exists');
        done();
      });
  });

  it('prevents a user from editing a group he is not a member of', (done) => {
    server
    .put('/api/v1/group/2/edit')
    .set('Authorization', `Bearer ${token}`)
    .send(updateInfo)
    .expect(401)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.globals.should.equal('You are not authorized to access this group!');
      done();
    });
  });

  it('prevents a user from deleting a group he is not a member of', (done) => {
    server
    .delete('/api/v1/group/1/delete')
    .set('Authorization', `Bearer ${token}`)
    .expect(401)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.globals.should.equal('You are not authorized to access this group!');
      done();
    });
  });
});
