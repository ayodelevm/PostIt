import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';

import config from './webpack.config.dev';
import models from './server/models/index';

// ROUTES

import authRoutes from './server/routes/authRoutes';
import groupRoutes from './server/routes/groupRoutes';
import messageRoutes from './server/routes/messageRoutes';
import addUsersRoutes from './server/routes/addusersRoutes';

dotenv.config({ silent: true });


const passport = require('passport');

const app = express();
if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }
const compiler = webpack(config);
if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('connect-multiparty')());

app.use(express.static(path.join(__dirname, '/build')));

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
passport.use(models.User.createStrategy());
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // if (req.user != undefined) console.log('from here--->', res.locals.currentUser.dataValues);
  next();
});


// ROUTES CONFIG
app.use(authRoutes);
app.use(groupRoutes);
app.use(messageRoutes);
app.use(addUsersRoutes);


// If no route is matched return a 404
app.use((req, res, next) => {
  // res.status(501).send({
  //   status: false,
  //   message: 'Sorry, this address is not supported by this API.'
  // });
  // next();
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Listening PORT
app.listen(process.env.PORT || 3002, () => {
  /* eslint-enable no-console */
  console.log('serving on port 3002');
  /* eslint-enable no-console */
});

export default app;
