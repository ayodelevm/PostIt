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
    models.Group.findOne({
      where: { id: req.params.id },
    }).then((foundGroup) => {
      foundGroup.getMessages({
        where: { archived: false },
        attributes: ['id', 'message', 'GroupId', 'priority', 'createdAt', ['UserId', 'ownerId']],
        joinTableAttributes: [],
        order: [['createdAt', 'ASC']]
      }).then((foundMessages) => {
        const found = Object.assign(JSON.parse(JSON.stringify(foundGroup)), { Messages: foundMessages === null ? [] : foundMessages });
        res.status(200).json({
          success: 'Successful.',
          found
        });
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
          const found = Object.assign({}, addedMessage.dataValues, { ownerId: addedMessage.dataValues.UserId });
          res.status(201).json({
            success: 'New message added successfully.',
            found
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

