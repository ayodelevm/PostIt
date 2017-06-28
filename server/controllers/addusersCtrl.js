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
    models.User.findAll().then((users) => {
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
    });
  }

/**
 * This method add new users to a group
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static addUsersToGroup(req, res) {
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
    });
  }
}
