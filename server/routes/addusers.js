import express from 'express';
import Middleware from './../middlewares';
import AddUsersCtrl from './../controllers/addusersCtrl';

const router = express.Router();


// Get all Users
router.get('/api/user', Middleware.isLoggedIn, AddUsersCtrl.getAllUsers);

// Get all Users that belongs to a group
router.get('/api/group/:id/user', Middleware.isLoggedIn, Middleware.isAuthorized, AddUsersCtrl.getUsersInGroup);

// Add New Users to a group
router.post('/api/group/:id/user', Middleware.isLoggedIn, Middleware.isAuthorized, AddUsersCtrl.addUsersToGroup);

export default router;
