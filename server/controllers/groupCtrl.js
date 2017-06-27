import models from './../models/index';

/**
 *
 */
export default class GroupCtrl {

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static getAll(req, res, next) {
    models.User.findAll({
      where: { id: req.user.dataValues.id },
      include: [
        { model: models.Group }
      ],
      order: [['createdAt', 'DESC']],
    }).then((found) => {
      res.status(200).json(found);
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
      next(err);
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static createNewGroup(req, res, next) {
    if (!req.body.name) {
      res.status(400).json({
        message: 'A new group needs to have a name'
      });
    }
    const newDetails = Object.assign(req.body, { UserId: req.user.dataValues.id });
    models.Group.create(newDetails).then((newGroup) => {
      models.UserGroup
      .create({
        UserId: req.user.dataValues.id,
        GroupId: newGroup.id
      })
      .then(() => {
        res.status(201).json({
          message: 'New group created successfully.',
          newGroup
        });
      });
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
      next(err);
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static updateOneGroup(req, res, next) {
    models.Group.findOne({
      where: { id: req.params.id }
    }).then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        group.update(req.body).then(() => {
          res.status(200).json({
            message: 'Group details updated successfully'
          });
        }).catch((err) => {
          res.status(500).json({
            message: err
          });
          next(err);
        });
      } else {
        res.status(401).json({
          message: 'You do not have permission to edit this group\'s details'
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
      next(err);
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static deleteOneGroup(req, res, next) {
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        group.destroy().then(() => {
          res.status(200).json({
            message: 'Group deleted successfully.'
          });
        }).catch((err) => {
          res.status(500).json({
            message: err
          });
          next(err);
        });
      } else {
        res.status(401).json({
          message: 'You do not have permission to delete this group'
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
      next(err);
    });
  }
}
