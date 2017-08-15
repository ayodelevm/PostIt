import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import models from './models/index';

// ROUTES

import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import messageRoutes from './routes/messageRoutes';
import addUsersRoutes from './routes/addusersRoutes';

dotenv.config();

const app = express();

// Allow Cross-Origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

// ROUTES CONFIG
app.use(authRoutes);
app.use(groupRoutes);
app.use(messageRoutes);
app.use(addUsersRoutes);


// If no route is matched return a 404
app.use((req, res, next) => {
  res.status(501).send({
    status: false,
    message: 'Sorry, this address is not supported by this API.'
  });
  next();
});

// Listening PORT
app.listen(process.env.PORT || 3002, () => {
  console.log('serving on port 3002');
});


export default app;
