import express from 'express';
import Middleware from './../middlewares';
import MessageCtrl from './../controllers/messageCtrl';

const router = express.Router();


// Get One
router.get('/api/group/:id/messages', Middleware.isLoggedIn, Middleware.isAuthorized, MessageCtrl.getGroupAndMessages);


// Create Message Route
router.post('/api/group/:id/message', Middleware.isLoggedIn, Middleware.isAuthorized, MessageCtrl.createNewMessage);



export default router;
