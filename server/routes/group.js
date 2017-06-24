import express from 'express';
import models from '../models/index';

const router = express.Router();


router.get('/api/group', (req, res, next) => {
  models.Group.findAll({
    include: [
      { model: models.User }
    ],
    order: [['createAt', 'DESC']]
  }).then((groups) => {
    res.status(200).json(groups);
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });
});

router.post('/api/group', (req, res, next) => {
  const newDetails = Object.assign(req.body, { UserId: req.session.id })
  if (!req.body.name) {
    res.status(400).json({
      message: 'A new group needs to have a name'
    });
  } else {
    models.Group.create(newDetails).then((newGroup) => {
      res.status(201).json({
        message: 'New group created successfully.',
        newGroup
      });
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
      next(err);
    });
  }
});

router.put('/api/group/edit/:id', (req, res, next) => {
  models.Group.findOne({
    where: { id: req.params.id }
  }).then((group) => {
    if (group.id === req.session.id) {
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

router.delete('/api/group/delete/:id', (req, res, next) => {
  models.Group.findOne({
    where: {
      id: req.params.id
    }
  }).then((group) => {
    if (group.id === req.session.id) {
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
