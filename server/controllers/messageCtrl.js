import models from './../models/index';
import urgentNotification from '../utils/urgentnotification';
import criticalNotification from '../utils/criticalnotification';
import { io } from '../app';

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
    return models.Group.findOne({
      where: { id: req.params.id },
    })
    .then((foundGroup) => {
      return foundGroup.getMessages({
        where: { archived: req.query.archived },
        attributes: ['id', 'message', 'GroupId', 'priority', 'createdAt', ['UserId', 'ownerId']],
        joinTableAttributes: [],
        order: [['createdAt', 'ASC']]
      })
      .then((found) => {
        const foundMessages = Object.assign(JSON.parse(JSON.stringify(foundGroup)), { Messages: found === null ? [] : found });
        return res.status(200).json({
          success: 'Successful.',
          foundMessages
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        globals: err.message || err.errors[0].message
      });
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
      return res.status(400).json({
        globals: 'Message cannot be empty'
      });
    } else {
      return models.Group.findOne({
        where: { id: req.params.id }
      })
      .then((foundGroup) => {
        const newMessage = Object.assign(req.body, {
          UserId: req.user.dataValues.id }, { GroupId: req.params.id });
        return models.Message.create(newMessage)
        .then((addedMessage) => {
          const createdMessage = Object.assign({},
            addedMessage.dataValues, { ownerId:
              addedMessage.dataValues.UserId
            });
          if (createdMessage.priority === 'Urgent') {
            urgentNotification(foundGroup,
              req.user.dataValues.username, req.headers.origin
            );
          }
          if (createdMessage.priority === 'Critical') {
            criticalNotification(foundGroup,
              req.user.dataValues.username, req.headers.origin
            );
          }
          io.emit('notification.updateMessage', {
            message: `@${req.user.dataValues.username} posted a new message in ${foundGroup.name}`,
            groupId: foundGroup.id,
            createdMessage
          });
          return res.status(201).json({
            success: 'New message added successfully.',
            createdMessage
          });
        })
        .catch((err) => {
          return res.status(500).json({
            globals: err.message || err.errors[0].message
          });
        });
      });
    }
  }

  /**
   * This method handles archiving of messages
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */
  static archiveMessages(req, res) {
    if (req.body.messageIds.length === 0) {
      return res.status(400).json({
        globals: 'There are no messages to archive in this group!'
      });
    }

    return models.Message.findAll({
      where: { id: req.body.messageIds }
    })
    .then((foundMessages) => {
      if (foundMessages) {
        Promise.all(
          foundMessages.map((found) => {
            return found.update({ archived: true });
          })
        )
        .then(() => {
          io.emit('archive.success', {
            groupId: req.params.id
          });
          return res.status(200).json({
            success: 'Messages have been archived successfully',
          });
        });
      } else {
        return res.status(404).json({
          globals: 'Messages not found'
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        globals: err.message || err.errors[0].message
      });
    });
  }
}

