import jwt from 'jsonwebtoken';
import models from '../models/index';

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
  static isAuthenticated(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          res.status(401).json({ globals: 'You need to be logged first!' });
        } else {
          models.User.findOne({
            where: { id: decoded.id },
            attributes: ['fullname', 'email', 'telephone', 'profileImage', 'id', 'username']
          }).then((foundUser) => {
            if (!foundUser) {
              res.status(404).json({ globals: 'No such user, please create an account!' });
            } else {
              req.user = foundUser;
              next();
            }
          });
        }
      });
    } else {
      return res.status(403).json({
        globals: 'Access denied! Please create an account or login first!'
      });
    }
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
          globals: 'You are not authorized to access this group!'
        });
      } else {
        next();
      }
    }).catch((err) => {
      res.status(500).json({
        globals: err.message || err.errors[0].message
      });
    });
  }
}
