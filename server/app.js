import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Sequelize from 'sequelize';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import User from './models/user';

// ROUTES

import authRoutes from './routes/auth';

const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('connect-multiparty')());

app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Anywhere I go',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  if (req.user != undefined) console.log(res.locals.currentUser.dataValues);
  next();
});


// ROUTES CONFIG
app.use(authRoutes);


// MiddleWares

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// If no route is matched return a 404
app.use((req, res, next) => {
  res.status(501).send({
    status: false,
    message: 'This API doesn\'t support that function.'
  });
  next();
});



app.listen(process.env.PORT || 3002, () => {
  console.log('serving on port 3002');
});

export default app;
