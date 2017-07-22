import passport from 'passport';
import models from './../models/index';

/**
 * This class handles the logic for registering an account signin and signing out
 */
export default class AuthCtrl {

/**
 * This method handles logic for registering a user
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
  static register(req, res) {
    if (!req.body.fullname) {
      return res.status(400).json({ error: 'fullname field cannot be empty' });
    } else if (!req.body.email) {
      return res.status(400).json({ error: 'email filed cannot be empty' });
    }
    models.User.register(req.body.username, req.body.password, (err, newUser) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }
      newUser.update({
        email: req.body.email,
        fullname: req.body.fullname
      }).then(() => {
        passport.authenticate('local')(req, res, () => {
          res.status(200).json({
            message: `Welcome to PostIt ${req.session.passport.user}`,
            user: req.session.passport.user
          });
        });
      }).catch(() => {
        models.User.destroy({
          where: { username: req.body.username }
        });
        return res.status(500).json({
          error: 'Invalid Email.'
        });
      });
    });
  }

/**
 *  This method handles logging in an existing user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
  static login(req, res, next) {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({
          error: info
        });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Cannot log in user'
          });
        }
        res.status(200).json({
          message: `Welcome back ${req.session.passport.user}`,
          user: req.session.passport.user
        });
      });
    })(req, res, next);
  }

/**
 * This method handles the logic for logging a user out
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static logout(req, res) {
    req.logout();
    res.status(200).json({
      message: 'Logged out successfully'
    });
  }
}
