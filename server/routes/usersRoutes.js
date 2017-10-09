import express from 'express';
import Middleware from './../utils/middlewares';
import UsersCtrl from './../controllers/usersCtrl';

const router = express.Router();


// Get all Users
router.get('/api/v1/users', Middleware.isAuthenticated, UsersCtrl.getAllUsers);

// Get all Users that belongs to a group
router.get('/api/v1/group/:id/users', Middleware
  .isAuthenticated, Middleware.isAuthorized, UsersCtrl.getUsersInGroup);

// Add New Users to a group
router.post('/api/v1/group/:id/user', Middleware
  .isAuthenticated, Middleware.isAuthorized, UsersCtrl.addUsersToGroup);

// Update User details
router.put('/api/v1/user/:id/edit', Middleware
  .isAuthenticated, UsersCtrl.updateOneUser);

export default router;
