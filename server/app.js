import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import winston from 'winston';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

// ROUTES

import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import messageRoutes from './routes/messageRoutes';
import usersRoutes from './routes/usersRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = socketIo(server);

app.use(logger('dev'));

// Allow Cross-Origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build/dist')));
app.use(express.static(path.join(__dirname, '../client/build')));

// ROUTES CONFIG
app.use(authRoutes);
app.use(groupRoutes);
app.use(messageRoutes);
app.use(usersRoutes);

// Configure Winston
winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'server.log' })
  ]
});

app.get('/api/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/build/index.html'));
});

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: '/',
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/dist/index.html'));
  });
}

// Listening PORT
server.listen(process.env.PORT || 3002, () => {
  winston.log('info', 'serving on port 3002');
});

export default app;
