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
    models.User.findAll({
      where: { id: req.user.dataValues.id },
      include: [
        { model: models.Group }
      ],
      order: [['createdAt', 'DESC']],
    }).then((found) => {
      res.status(200).json({
        success: 'Successful.',
        found
      });
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
    });
  }

/**
 * This method handles creating of a new group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static createNewGroup(req, res) {
    if (!req.body.name) {
      res.status(400).json({
        error: 'A new group needs to have a name'
      });
    } else {
      const newDetails = Object.assign(req.body, { UserId: req.user.dataValues.id });
      models.Group.create(newDetails).then((newGroup) => {
        models.UserGroup
        .create({
          UserId: req.user.dataValues.id,
          GroupId: newGroup.id
        })
        .then(() => {
          res.status(201).json({
            success: 'New group created successfully.',
            newGroup
          });
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
    models.Group.findAll({
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
