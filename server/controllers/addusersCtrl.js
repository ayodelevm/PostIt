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
      attributes: { exclude: ['mysalt', 'updatedAt'] }
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
      include: [
        { model: models.User,
          attributes: { exclude: ['mysalt', 'updatedAt'] },
          through: { attributes: [] } }
      ],
      order: [['createdAt', 'DESC']]
    }).then((found) => {
      const currentGroup = { groupId: found.id,
        name: found.name,
        description: found.description,
        imageUrl: found.imageUrl,
        ownerId: found.UserId,
        createdAt: found.createdAt };

      res.status(200).json({
        success: 'Successful.',
        currentGroup,
        groupMembers: found.Users
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
    const idToAdd = Number(req.body.idToAdd);
    models.Group.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group.UserId === req.user.dataValues.id) {
        models.UserGroup.findOrCreate({
          where: { $and: {
            GroupId: req.params.id,
            UserId: idToAdd
          } },
          defaults: {
            GroupId: req.params.id,
            UserId: idToAdd
          }
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
