import express from 'express';
import models from '../models/index';
import Middleware from './../middlewares';

const router = express.Router();


// Get all Users
router.get('/api/user', Middleware.isLoggedIn, (req, res, next) => {
  models.User.findAll().then((users) => {
    res.status(200).json({
      message: 'Successful',
      users
    });
  }).catch((err) => {
    res.status(500).json(err);
    next(err);
  });
});

// Get all Users that belongs to a group
router.get('/api/group/:id/user', Middleware.isLoggedIn, Middleware.isAuthorized, (req, res, next) => {
  models.Group.findAll({
    where: { id: req.params.id },
    include: [
     { model: models.User }
    ],
    order: [['createdAt', 'DESC']]
  }).then((found) => {
    res.status(200).json({
      message: 'Successful',
      groupMembers: found
    });
  }).catch((err) => {
    res.status(500).json(err);
    next(err);
  });
});

// Add New Users to a group
router.post('/api/group/:id/user', Middleware.isLoggedIn, Middleware.isAuthorized, (req, res, next) => {
  let existingUser = [];
  const usersList = req.body.usersList;
  usersList.forEach((eachUserId) => {
    models.UserGroup.findAll({
      where: { GroupId: req.params.id }
    }).then((found) => {
      const UserIdArray = found.map(obj => obj.UserId);
      if (eachUserId in UserIdArray) {
        existingUser = existingUser.concat(eachUserId);
      } else {
        models.UserGroup.build({
          UserId: Number(eachUserId),
          GroupId: req.params.id
        }).save().catch((err) => {
          res.status(500).json(err);
        });
      }
    }).catch((err) => {
      res.status(500).json(err);
      next(err);
    });
  });
  res.status(200).json({
    message: 'Users added successfully.',
    existing: existingUser
  });
});

export default router;
