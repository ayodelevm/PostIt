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
   * @param {*} next 
   */
  static isAuthorized(req, res, next) {
    if (req.isAuthenticated()) {
      models.UserGroup.findOne({
        where: { $and: [
          { UserId: req.user.dataValues.id },
          { GroupId: req.params.id }]
        },
      }).then((found) => {
        if (found === null) {
          res.status(400).json({
            message: 'You are not a member of this group!'
          });
        } else {
          next();
        }
      }).catch((err) => {
        res.status(500).json(err);
        next(err);
      });
    } else {
      res.status(400).json({
        message: 'You need to be logged in to do that!'
      });
    }
  }
}
