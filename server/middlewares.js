import models from './models/index';

/**
 * This class handles all middlewares for authorization
 */
export default class Middlewares {

  /**
   * This method checks if a user is logged in and prevents jumping routes
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {void}
   */
  static isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(400).json({
      message: 'You need to be logged in to do that!'
    });
  }

  /**
   * This method checks if the user is in a group before allowing the user to perform
   * any action in that group
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {void}
   */
  static isAuthorized(req, res, next) {
    models.UserGroup.findOne({
      where: { $and: [
        { UserId: req.user.dataValues.id },
        { GroupId: req.params.id }]
      },
    }).then((found) => {
      if (found === null) {
        res.status(400).json({
          error: 'You are not authorized to access this group!'
        });
      } else {
        next();
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}
