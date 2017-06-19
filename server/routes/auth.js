import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import User from '../models/user';

const router = express.Router();


router.get('/secret', (req, res) => {
  res.render('secret');
});

// ======================
// AUTH ROUTES
// ======================

// Show register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Sign up logic
router.post('/register', (req, res) => {
  console.log(req.body);
  // const newUser = new User({ username: req.body.username, fullname: req.body.fullname, email: req.body.email });
  User.register(req.body.username, req.body.password, (err, newUser) => {

    if (err) {
      console.log(err);
      req.flash('error', `${err.message}`);
      return res.render('register');
    }
    newUser.isAdmin = false;
    newUser.email = req.body.email;
    newUser.fullName = req.body.fullname;
    newUser.save();

    passport.authenticate('local')(req, res, () => {
      console.log(req.dataValues);
      req.flash('success', 'Welcome to PostIt');
      res.redirect('/secret');
    });
  });
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Add login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: true
}), (req, res) => {
});

// Add logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('error', 'Loged out successful!');
  res.redirect('/login');
});

export default router;
