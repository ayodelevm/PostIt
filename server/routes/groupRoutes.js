import express from 'express';
import Middleware from './../utils/middlewares';
import GroupCtrl from './../controllers/groupCtrl';

const router = express.Router();

// Get All Groups
router.get('/api/groups', Middleware.isAuthenticated, GroupCtrl.getAll);

// Create New Group
router.post('/api/group', Middleware.isAuthenticated, GroupCtrl.createNewGroup);

// Get one group to be edited
router.get('/api/group/:id/edit', Middleware.isAuthenticated, Middleware.isAuthorized, GroupCtrl.getOneGroup);

// Update Group details
router.put('/api/group/:id/edit', Middleware.isAuthenticated, Middleware.isAuthorized, GroupCtrl.updateOneGroup);

// Delete Group details
router.delete('/api/group/:id/delete', Middleware.isAuthenticated, Middleware.isAuthorized, GroupCtrl.deleteOneGroup);

export default router;
