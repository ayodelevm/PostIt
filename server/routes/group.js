import express from 'express';
import models from '../models/index';

const router = express.Router();

// Get All
router.get('/api/group', (req, res, next) => {
  models.UserGroup.findAll({
    where: {
      UserId: req.session.id
    },
    include: [
      { model: models.Group },
      { model: models.User }
    ],
    order: [['createAt', 'DESC']]
  }).then((userGroups) => {
    res.status(200).json(userGroups);
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });


  // models.Group.findAll({
  //   include: [
  //     { model: models.User }
  //   ],
  //   order: [['createAt', 'DESC']]
  // }).then((groups) => {
  //   res.status(200).json(groups);
  // }).catch((err) => {
  //   res.status(500).json({
  //     message: err
  //   });
  //   next(err);
  // });
});

router.post('/api/group', (req, res, next) => {
  // const newDetails = Object.assign(req.body, { Owner: req.session.id });
  const newDetails = req.body;
  if (!req.body.name) {
    res.status(400).json({
      message: 'A new group needs to have a name'
    });
  } else {
    console.log('=====', typeof req.body.Owner);
    models.Group.create(newDetails).then((newGroup) => {
      console.log('=====>>>>', typeof newGroup.id);
      models.UserGroup
      .create({
        message: 'It a beautiful day today',
        // Owner: req.session.id,
        UserId: req.body.UserId,
        GroupId: newGroup.id
      })
      // .save()
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
  }
});

router.post('/api/usergroup', (req, res) => {
  models.sequelize.sync({ force: true }).then(() => {
    models.UserGroup.create({
      UserId: req.body.UserId
    }).then((newg) => {
      res.json(newg);
    });
  });
});
// Get One
router.get('/api/group', (req, res, next) => {
  models.UserGroup.findAll({
    where: {
      GroupId: req.params.id
    },
    include: [
      { model: models.Group },
      { model: models.User }
    ],
    order: [['createAt', 'DESC']]
  }).then((userGroups) => {
    res.status(200).json(userGroups);
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
    next(err);
  });
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

export default router;
