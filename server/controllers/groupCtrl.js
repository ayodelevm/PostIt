import models from './../models/index';
import { validateGroupInput, groupValidation } from '../utils/validations';
import { io } from '../app';


/**
 * This class CRUD functions for groups
 */
export default class GroupCtrl {

/**
 * This method gets all the group a user belongs to/ created
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static getAll(req, res) {
    return models.User.findOne({
      where: { id: req.user.dataValues.id },
      attributes: { exclude: ['mysalt', 'updatedAt',
        'password', 'googleSubId', 'createdAt'] }
    })
    .then(foundUser => foundUser.getGroups({
      attributes: ['id', 'name', 'description',
        'imageUrl', 'createdAt', ['UserId', 'ownerId']],
      joinTableAttributes: [],
      order: [['createdAt', 'DESC']],
    })
      .then((foundGroup) => {
        const foundGroups = Object.assign(JSON
          .parse(JSON.stringify(foundUser)), { Groups: foundGroup });
        return res.status(200).json({
          success: 'Successful.',
          foundGroups
        });
      }))
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }

/**
 * This method handles creating a new group and adding
 * members to group when creating group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static createNewGroup(req, res) {
    let members = [].concat(req.user.dataValues.username);
    if (req.body.members) {
      members = ([...req.body.members, req.user.dataValues.username]);
    }

    return groupValidation(req.body, validateGroupInput)
    .then(({ errors, isValid }) => {
      if (isValid) {
        const newDetails = Object.assign(req.body,
          { UserId: req.user.dataValues.id });
        return models.Group.create(newDetails)
        .then(createdGroup => models.User.findAll({
          where: { username: members }
        })
          .then(foundUsers => createdGroup.addUsers(foundUsers)
            .then(() => {
              const newGroup = Object.assign({}, createdGroup.dataValues,
                { ownerId: createdGroup.dataValues.UserId });
              io.emit('new.group', {
                success: 'New group created successfully.',
                newGroup
              });
              return res.status(201).json({
                success: 'New group created successfully.',
                newGroup
              });
            })));
      }
      return res.status(422).json({ errors });
    });
  }

/**
 * This method handles getting one group only for editing
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static getOneGroup(req, res) {
    return models.Group.findOne({
      where: { id: req.params.id },
    })
    .then(foundGroup => res.status(200).json({
      success: 'Successful.',
      foundGroup
    }))
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }


/**
 * This method handles updating a group's info after editing
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static updateOneGroup(req, res) {
    if (!req.body.name) {
      return res.status(422).json({
        globals: 'A group needs to have a name'
      });
    }
    return models.Group.findOne({
      where: { id: req.params.id }
    })
      .then((group) => {
        if (group.UserId === req.user.dataValues.id) {
          return group.update(req.body)
          .then(() => res.status(200).json({
            success: 'Group details updated successfully.'
          }))
          .catch(err => res.status(500).json({
            globals: err.message || err.errors[0].message
          }));
        }
        return res.status(403).json({
          globals: 'You do not have permission to edit this group\'s details'
        });
      })
      .catch(err => res.status(500).json({
        globals: err.message || err.errors[0].message
      }));
  }

/**
 * This method handles deleting a group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static deleteOneGroup(req, res) {
    return models.Group.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        return group.destroy()
        .then(() => res.status(200).json({
          success: 'Group deleted successfully.'
        }))
        .catch(err => res.status(500).json({
          globals: err.message || err.errors[0].message
        }));
      }
      return res.status(403).json({
        globals: 'You do not have permission to delete this group'
      });
    })
    .catch(err => res.status(500).json({
      globals: err.message || err.errors[0].message
    }));
  }
}
