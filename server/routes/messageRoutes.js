import express from 'express';
import Middleware from './../utils/middlewares';
import MessageCtrl from './../controllers/messageCtrl';

const router = express.Router();


// Get One
router.get('/api/v1/group/:id/messages', Middleware
  .isAuthenticated, Middleware.isAuthorized, MessageCtrl.getGroupAndMessages);

// Create Message Route
router.post('/api/v1/group/:id/message', Middleware
  .isAuthenticated, Middleware.isAuthorized, MessageCtrl.createNewMessage);

// Archive Messages Route
router.put('/api/v1/group/:id/archivemessages', Middleware
  .isAuthenticated, Middleware.isAuthorized, MessageCtrl.archiveMessages);

export default router;
