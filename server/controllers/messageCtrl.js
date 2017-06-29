import models from './../models/index';

/**
 * This class handles posting messages in groups
 */
export default class messageCtrl {

/**
 * This method handles getting one group and all it's messages
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static getGroupAndMessages(req, res) {
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
    });
  }

/**
 * This method handles posting messages to member groups
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static createNewMessage(req, res) {
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
        });
      });
    }
  }
}

