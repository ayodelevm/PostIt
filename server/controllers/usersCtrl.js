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
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    const search = req.query.username || '';

    return models.User.findAndCountAll({
      limit: Number(req.query.limit) || 30,
      offset: Number(req.query.offset) || 0,
      where: { username: { $ilike: `%${search}%` } },
      attributes: { exclude:
        ['mysalt', 'updatedAt', 'password', 'googleSubId', 'createdAt']
      }
    })
    .then((result) => {
      const pagination = {
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length
      };
      return res.status(200).json({
        success: 'Successful.',
        users: result.rows,
        pagination
      });
    })
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }

/**
 * This methods gets all the users that are in a particular group
 * @param {object} req
 * @param {object} res - A group and it's members
 * @returns {void}
 */
  static getUsersInGroup(req, res) {
    return models.Group.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'description', 'imageUrl',
        'createdAt', ['UserId', 'ownerId']],
    })
    .then(foundGroup => foundGroup.getUsers({
      attributes: { exclude:
          ['mysalt', 'updatedAt', 'password', 'googleSubId', 'createdAt']
      },
      joinTableAttributes: []
    })
      .then((found) => {
        const foundUsers = Object.assign(JSON.parse(JSON
          .stringify(foundGroup)), { Users: found });
        return res.status(200).json({
          success: 'Successful.',
          foundUsers
        });
      })
      .catch(err => res.status(500).json({
        globals: err.message || err.errors[0].message
      })))
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }

/**
 * This method add new users to a group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static addUsersToGroup(req, res) {
    const members = [].concat(req.body.members);
    if (members.length === 0) {
      return res.status(422).json({
        globals: 'No user selected, please select from dropdown!'
      });
    }
    return models.Group.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((foundGroup) => {
      if (foundGroup.UserId === req.user.dataValues.id) {
        return models.User.findAll({
          where: {
            username: members
          }
        })
        .then((foundUsers) => {
          if (Array.isArray(foundUsers) && foundUsers.length === 0) {
            return res.status(404).json({
              globals: 'User not found'
            });
          }
          return foundGroup.addUsers(foundUsers)
          .then((addedUsers) => {
            if (addedUsers.length === 0) {
              return res.status(422).json({
                globals: 'Selected users are already members of this group'
              });
            }
            io.emit('new.member', {
              success: 'new users added successfully',
              groupId: req.params.id
            });
            return res.status(200).json({
              success: 'new users added successfully',
              addedUsers
            });
          });
        })
        .catch(err => res.status(500).json({
          globals: err.message || err.errors[0].message
        }));
      }
      return res.status(403).json({
        globals: 'You are not allowed to add users' +
          ' to this group, please contact admin!'
      });
    })
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }

  /**
 * This method handles logic for updating a user
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
  static updateOneUser(req, res) {
    return models.User.findOne({
      where: { id: req.user.dataValues.id }
    })
    .then(foundUser => foundUser.update(req.body)
      .then(() => res.status(200).json({
        success: 'Profile Image updated successfully.',
      }))
      .catch(err => res.status(500).json({
        globals: err.message || err.errors[0].message
      })))
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }
}
