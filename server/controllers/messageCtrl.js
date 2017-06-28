import models from './../models/index';

/**
 *
 */
export default class messageCtrl {

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static getGroupAndMessages(req, res, next) {
    models.Group.findAll({
      where: { id: req.params.id },
      include: [
        { model: models.Message,
          order: [['createdAt', 'DESC']]
        }]
    }).then((foundGroup) => {
      res.status(200).json({
        success: 'Successful.',
        foundGroup
      });
    }).catch((err) => {
      res.status(500).json(err);
      next(err);
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static createNewMessage(req, res, next) {
    if (!req.body.message) {
      res.status(400).json({
        error: 'Message cannot be empty'
      });
    } else {
      models.Group.findOne({
        where: { id: req.params.id }
      }).then(() => {
        const newMessage = Object.assign(req.body, {
          UserId: req.user.dataValues.id }, { GroupId: req.params.id });
        models.Message.create(newMessage).then((addedMessage) => {
          res.status(201).json({
            success: 'New message added successfully.',
            addedMessage
          });
        }).catch((err) => {
          res.status(500).json({
            error: err.errors[0].message
          });
          next(err);
        });
      });
    }
  }
}

