import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../app';
import models from '../models/index';
import { user, loginUser } from './../seeders/authSeeds';
import { groupDetails, updateInfo } from './../seeders/groupSeeds';

const server = supertest.agent(app);

before((done) => {
  models.sequelize.sync({force:true}).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

after((done) => {
  models.User.sync({ force: true })
    .then(() => {
      done(null);
    }).catch((errors) => {
      done(errors);
    });
});

describe('Create Group Routes', () => {
  it('allows a new user to create account and login later', (done) => {
    server
      .post('/api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[1])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.should.equal('lolade');
        done();
      });
  });

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
      res.body.message.should.equal('New group created successfully.');
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

  it('allows a logged in user to get all the groups he belongs to', (done) => {
    server
    .get('/api/group')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Successful.');
    });
  });

  it('allows a group admin to edit the group details', (done) => {
    server
    .post('/api/group/2/edit')
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
    .get('/api/group/1/edit')
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.success.should.equal('Group deleted successfully.');
      done();
    });
  });

});


