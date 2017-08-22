import models from './../models/index';

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
      attributes: { exclude: ['mysalt', 'updatedAt', 'password'] }
    }).then((users) => {
      res.status(200).json({
        success: 'Successful.',
        users
      });
    }).catch((err) => {
      res.status(500).json(err);
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
        attributes: { exclude: ['mysalt', 'updatedAt', 'password'] },
        joinTableAttributes: []
      }).then((foundUsers) => {
        const found = Object.assign(JSON.parse(JSON.stringify(foundGroup)), { Users: foundUsers });
        res.status(200).json({
          success: 'Successful.',
          found,
        });
      }).catch((err) => {
        res.status(500).json(err);
      });
    }).catch((err) => {
      res.status(500).json(err);
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
    console.log('**********new*******', newGroupMembers);
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
          foundGroup.addUsers(foundUsers).then((addedUsers) => {
            res.status(201).json({
              success: 'new users added successfully',
              addedUsers
            });
          });
        }).catch(() => {
          res.status(404).json({
            globals: 'User not found'
          });
        });
      } else {
        res.status(400).json({
          globals: 'You are not allowed to add new users to this group, please contact admin!'
        });
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}
