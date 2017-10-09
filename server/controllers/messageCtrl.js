import models from './../models/index';
import urgentNotification from '../utils/urgentNotification';
import criticalNotification from '../utils/criticalNotification';
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
    .then(foundGroup => foundGroup.getMessages({
      where: { archived: req.query.archived },
      attributes: ['id', 'message', 'GroupId', 'priority',
        'createdAt', ['UserId', 'ownerId']],
      joinTableAttributes: [],
      order: [['createdAt', 'ASC']]
    })
      .then((found) => {
        const foundMessages = Object.assign(JSON
          .parse(JSON.stringify(foundGroup)), {
            Messages: found === null ? [] : found
          });
        return res.status(200).json({
          success: 'Successful.',
          foundMessages
        });
      }))
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }

/**
 * This method handles posting messages to member groups
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static createNewMessage(req, res) {
    if (!req.body.content) {
      return res.status(422).json({
        globals: 'Message cannot be empty'
      });
    } else {
      return models.Group.findOne({
        where: { id: req.params.id }
      })
      .then((foundGroup) => {
        const payload = {
          message: req.body.content,
          priority: req.body.priority,
          UserId: req.user.dataValues.id,
          GroupId: req.params.id
        };
        return models.Message.create(payload)
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
          const username = req.user.dataValues.username;
          io.emit('notification.updateMessage', {
            message: `@${username} posted a new message in ${foundGroup.name}`,
            groupId: foundGroup.id,
            createdMessage
          });
          return res.status(201).json({
            success: 'New message added successfully.',
            createdMessage
          });
        })
        .catch(err => res.status(500).json({
          globals: err.message || err.errors[0].message
        }));
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
      return res.status(422).json({
        globals: 'There are no messages to archive in this group!'
      });
    }

    return models.Group.findOne({
      where: { id: req.params.id }
    }).then((foundGroup) => {
      if (foundGroup.UserId !== req.user.dataValues.id) {
        return res.status(403).json({
          globals: 'You are not allowed to archive in this' +
          ' group, please contact admin!'
        });
      }
      return models.Message.findAll({
        where: { id: req.body.messageIds }
      })
    .then((foundMessages) => {
      if (foundMessages.length !== 0) {
        Promise.all(
          foundMessages.map(found => found.update({ archived: true }))
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
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
    })
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }
}

