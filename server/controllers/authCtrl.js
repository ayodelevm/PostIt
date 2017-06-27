import passport from 'passport';
import models from './../models/index';

/**
 *
 */
export default class AuthCtrl {

/**
 *
 * @param {*} req 
 * @param {*} res 
 */
  static register(req, res) {
    models.User.register(req.body.username, req.body.password, (err, newUser) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }
      newUser.email = req.body.email;
      newUser.fullname = req.body.fullname;
      newUser.save();

      passport.authenticate('local')(req, res, () => {
        res.status(200).json({
          message: `Welcome to PostIt ${req.session.passport.user}`,
          user: req.session.passport.user
        });
      });
    });
  }

/**
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
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
 *
 * @param {*} req 
 * @param {*} res 
 */
  static logout(req, res) {
    req.logout();
    res.status(200).json({
      message: 'Logged out successfully'
    });
  }
}
