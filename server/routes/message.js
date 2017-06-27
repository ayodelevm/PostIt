import express from 'express';
import models from '../models/index';
import Middleware from './../middlewares';

const router = express.Router();


router.post('/api/group/:id/message', Middleware.isLoggedIn, Middleware.isAuthorized, (req, res, next) => {
  models.Group.findOne({
    where: { id: req.params.id }
  }).then((foundGroup) => {
    const newMessage = Object.assign(req.body, {
      UserId: req.user.dataValues.id
    }, {
      GroupId: req.params.id
    });

    models.Message.create(newMessage).then((addedMessage) => {
      res.status(200).json({
        message: 'New message added successfully.',
        addedMessage
      });
    }).catch((err) => {
      res.status(500).json(err);
      next(err);
    });
  });
});



export default router;
