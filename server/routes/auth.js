import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import User from '../models/user';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up logic
router.post('/register', (req, res) => {
  User.register(req.body.username, req.body.password, (err, newUser) => {

    if (err) {
      req.flash('error', `${err.message}`);
      return res.status(500).json({
        message: err.message
      });
    }
    newUser.isAdmin = false;
    newUser.email = req.body.email;
    newUser.fullName = req.body.fullName;
    newUser.save();

    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to PostIt');
      res.status(200).json({
        message: `Welcome to PostIt + ${req.session.passport.user}`,
        user: req.session.passport.user
      });
    });
  });
});

// Login logic

router.post('/login', (req, res, next) => {
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
});

// Add logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('error', 'Loged out successful!');
  res.status(200).json({
    message: 'Logged out successfully'
  });
});

export default router;
