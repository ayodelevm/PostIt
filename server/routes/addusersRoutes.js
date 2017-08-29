import express from 'express';
import Middleware from './../utils/middlewares';
import AddUsersCtrl from './../controllers/addusersCtrl';

const router = express.Router();


// Get all Users
router.get('/api/v1/users', Middleware.isAuthenticated, AddUsersCtrl.getAllUsers);

// Get all Users that belongs to a group
router.get('/api/v1/group/:id/users', Middleware.isAuthenticated, Middleware.isAuthorized, AddUsersCtrl.getUsersInGroup);

// Add New Users to a group
router.post('/api/v1/group/:id/user', Middleware.isAuthenticated, Middleware.isAuthorized, AddUsersCtrl.addUsersToGroup);

// Update User details
router.put('/api/v1/user/:id/edit', Middleware.isAuthenticated, AddUsersCtrl.updateOneUser);

export default router;
