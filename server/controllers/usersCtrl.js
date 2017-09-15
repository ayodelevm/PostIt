import models from './../models/index';
import { io } from '../app';

/**
 * This class handles adding of users to a group
 */
export default class AddUsersCtrl {

/**
 * This method gets all users that have been registerd
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static getAllUsers(req, res) {
    models.User.findAll({
      attributes: { exclude: ['mysalt', 'updatedAt', 'password', 'googleSubId', 'createdAt'] }
    }).then((users) => {
      res.status(200).json({
        success: 'Successful.',
        users
      });
    }).catch((err) => {
      res.status(500).json({
        globals: err.message || err.errors[0].message
      });
    });
  }

/**
 * This methods gets all the users that are in a particular group
 * @param {object} req
 * @param {object} res - A group and it's members
 * @returns {void}
 */
  static getUsersInGroup(req, res) {
    models.Group.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'description', 'imageUrl', 'createdAt', ['UserId', 'ownerId']],
    }).then((foundGroup) => {
      foundGroup.getUsers({
        attributes: { exclude: ['mysalt', 'updatedAt', 'password', 'googleSubId', 'createdAt'] },
        joinTableAttributes: []
      }).then((found) => {
        const foundGroupAndUsers = Object.assign(JSON.parse(JSON.stringify(foundGroup)), { Users: found });
        res.status(200).json({
          success: 'Successful.',
          foundGroupAndUsers
        });
      }).catch((err) => {
        res.status(500).json({
          globals: err.message || err.errors[0].message
        });
      });
    }).catch((err) => {
      res.status(500).json({
        globals: err.message || err.errors[0].message
      });
    });
  }

/**
 * This method add new users to a group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static addUsersToGroup(req, res) {
    const newGroupMembers = [].concat(req.body.newGroupMembers);
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((foundGroup) => {
      if (foundGroup.UserId === req.user.dataValues.id) {
        models.User.findAll({
          where: {
            username: newGroupMembers
          }
        }).then((foundUsers) => {
          if (Array.isArray(foundUsers) && foundUsers.length === 0) {
            return res.status(404).json({
              globals: 'User not found'
            });
          }
          foundGroup.addUsers(foundUsers).then((addedUsers) => {
            if (addedUsers.length === 0) {
              return res.status(400).json({
                globals: 'Selected users are already members of this group'
              });
            }
            io.emit('new.member', {
              success: 'new users added successfully',
              groupId: req.params.id
            });
            res.status(201).json({
              success: 'new users added successfully',
              addedUsers
            });
          });
        }).catch(() => {
        });
      } else {
        return res.status(403).json({
          globals: 'You are not allowed to add new users to this group, please contact admin!'
        });
      }
    }).catch((err) => {
      res.status(500).json({
        globals: err.message || err.errors[0].message
      });
    });
  }

  /**
 * This method handles logic for updating a user
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
  static updateOneUser(req, res) {
    models.User.findOne({
      where: { id: req.user.dataValues.id }
    }).then((foundUser) => {
      foundUser.update(req.body).then(() => {
        res.status(200).json({
          success: 'User details updated successfully.',
        });
      }).catch((err) => {
        res.status(500).json({
          globals: err.message || err.errors[0].message
        });
      });
    }).catch((err) => {
      res.status(500).json({
        globals: err.message || err.errors[0].message
      });
    });
  }
}
