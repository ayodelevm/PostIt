import express from 'express';
import models from '../models/index';
import Middleware from './../middlewares';

const router = express.Router();

// Get All
router.get('/api/group', Middleware.isLoggedIn, (req, res, next) => {
  models.User.findAll({
    where: { id: req.user.dataValues.id },
    include: [
      { model: models.Group }
    ],
    order: [['createdAt', 'DESC']],
  }).then((found) => {
    res.status(200).json(found);
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });
});

// Create New Group
router.post('/api/group', Middleware.isLoggedIn, (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({
      message: 'A new group needs to have a name'
    });
  }
  const newDetails = Object.assign(req.body, { UserId: req.user.dataValues.id });
  models.Group.create(newDetails).then((newGroup) => {
    models.UserGroup
    .create({
      UserId: req.user.dataValues.id,
      GroupId: newGroup.id
    })
    .then(() => {
      res.status(201).json({
        message: 'New group created successfully.',
        newGroup
      });
    });
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });
});

// Get One
router.get('/api/group/:id', Middleware.isLoggedIn, Middleware.isAuthorized, (req, res, next) => {
  models.Group.findAll({
    where: { id: req.params.id },
    include: [
      { model: models.Message,
        order: [['createdAt', 'DESC']]
      }]
  }).then((foundGroup) => {
    res.status(200).json({
      message: 'Successful.',
      foundGroup
    });
  }).catch((err) => {
    res.status(500).json(err);
    next(err);
  });
});

router.put('/api/group/:id/edit', Middleware.isLoggedIn, Middleware.isAuthorized, (req, res, next) => {
  models.Group.findOne({
    where: { id: req.params.id }
  }).then((group) => {
    if (group.id === req.user.dataValues.id) {
      group.update(req.body).then(() => {
        res.status(200).json({
          message: 'Group details updated successfully'
        });
      }).catch((err) => {
        res.status(500).json({
          message: err
        });
        next(err);
      });
    } else {
      res.status(401).json({
        message: 'You do not have permission to edit this group\'s details'
      });
    }
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });
});

router.delete('/api/group/:id/delete', Middleware.isLoggedIn, Middleware.isAuthorized, (req, res, next) => {
  models.Group.findOne({
    where: {
      id: req.params.id
    }
  }).then((group) => {
    if (group.id === req.user.dataValues.id) {
      group.destroy().then(() => {
        res.status(200).json({
          message: 'Group deleted successfully.'
        });
      }).catch((err) => {
        res.status(500).json({
          message: err
        });
        next(err);
      });
    } else {
      res.status(401).json({
        message: 'You do not have permission to edit this group'
      });
    }
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });
});

export default router;
