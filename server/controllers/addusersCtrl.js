import models from './../models/index';

/**
 *
 */
export default class AddUsersCtrl {

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static getAllUsers(req, res, next) {
    models.User.findAll().then((users) => {
      res.status(200).json({
        success: 'Successful.',
        users
      });
    }).catch((err) => {
      res.status(500).json(err);
      next(err);
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static getUsersInGroup(req, res, next) {
    models.Group.findAll({
      where: { id: req.params.id },
      include: [
      { model: models.User }
      ],
      order: [['createdAt', 'DESC']]
    }).then((found) => {
      res.status(200).json({
        success: 'Successful.',
        groupMembers: found
      });
    }).catch((err) => {
      res.status(500).json(err);
      next(err);
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static addUsersToGroup(req, res, next) {
    const usersList = [].concat(req.body.usersList);
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        usersList.forEach((eachId) => {
          models.UserGroup.findOrCreate({
            where: { $and: {
              GroupId: req.params.id,
              UserId: eachId
            } },
            defaults: {
              GroupId: req.params.id,
              UserId: eachId
            }
          });
        });
        res.status(201).json({
          success: 'Successful.',
        });
      } else {
        res.status(400).json({
          error: 'You are not allowed to add new users to this group, please contact admin!'
        });
      }
    }).catch((err) => {
      res.status(500).json(err);
      next(err);
    });
  }
}
