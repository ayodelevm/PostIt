import models from './../models/index';

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
    models.User.findOne({
      where: { id: req.user.dataValues.id },
      attributes: { exclude: ['mysalt', 'updatedAt', 'password'] }
    }).then((foundUser) => {
      foundUser.getGroups({
        attributes: ['id', 'name', 'description', 'imageUrl', 'createdAt', ['UserId', 'ownerId']],
        joinTableAttributes: [],
        order: [['createdAt', 'DESC']],
      }).then((foundGroup) => {
        const found = Object.assign(JSON.parse(JSON.stringify(foundUser)), { Groups: foundGroup });
        res.status(200).json({
          success: 'Successful.',
          found
        });
      });
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
    });
  }

/**
 * This method handles creating a new group and adding members to group when creating group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static createNewGroup(req, res) {
    let initialGroupMembers = [].concat(req.user.dataValues.id);
    if (req.body.initialGroupMembers) {
      const approved = true, disapproved = false;
      initialGroupMembers = ([...req.body.initialGroupMembers, req.user.dataValues.id])
                        /* eslint no-confusing-arrow: ["error", {"allowParens": true}] */
                        /* eslint-env es6 */
                        .filter(id => (!id && id !== 0 ? disapproved : approved))
                        .map(id => Number(id));
    }
    if (!req.body.name) {
      res.status(400).json({
        error: 'A new group needs to have a name'
      });
    } else {
      const newDetails = Object.assign(req.body, { UserId: req.user.dataValues.id });
      models.Group.create(newDetails).then((newGroup) => {
        models.User.findAll({
          where: { id: initialGroupMembers }
        })
        .then((foundUsers) => {
          newGroup.addUsers(foundUsers).then(() => {
            res.status(201).json({
              success: 'New group created successfully.',
              newGroup
            });
          });
        }).catch((err) => {
          res.status(500).send(err);
        });
      }).catch((err) => {
        res.status(500).json({
          error: err.errors[0].message
        });
      });
    }
  }

/**
 * This method handles getting one group only for editing
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static getOneGroup(req, res) {
    models.Group.findOne({
      where: { id: req.params.id },
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
 * This method handles updating a group's info after editing
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static updateOneGroup(req, res) {
    if (!req.body.name) {
      res.status(400).json({
        error: 'A group needs to have a name'
      });
    } else {
      models.Group.findOne({
        where: { id: req.params.id }
      }).then((group) => {
        if (group.UserId === req.user.dataValues.id) {
          group.update(req.body).then(() => {
            res.status(200).json({
              success: 'Group details updated successfully.'
            });
          }).catch((err) => {
            res.status(500).json({
              message: err
            });
          });
        } else {
          res.status(401).json({
            error: 'You do not have permission to edit this group\'s details'
          });
        }
      }).catch((err) => {
        res.status(500).json({
          error: err.errors[0].message
        });
      });
    }
  }

/**
 * This method handles deleting a group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static deleteOneGroup(req, res) {
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        group.destroy().then(() => {
          res.status(200).json({
            success: 'Group deleted successfully.'
          });
        }).catch((err) => {
          res.status(500).json({
            message: err
          });
        });
      } else {
        res.status(401).json({
          error: 'You do not have permission to delete this group'
        });
      }
    }).catch((err) => {
      res.status(500).json({
        error: err.errors[0].message
      });
    });
  }
}
