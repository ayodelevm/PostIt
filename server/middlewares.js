import models from './models/index';

/**
 *
 */
export default class Middlewares {

  /**
   *
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
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
   *
   * @param {*} req 
   * @param {*} res 
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
