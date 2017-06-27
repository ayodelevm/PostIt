import express from 'express';
import Middleware from './../middlewares';
import GroupCtrl from './../controllers/groupCtrl';

const router = express.Router();

// Get All Groups
router.get('/api/group', Middleware.isLoggedIn, GroupCtrl.getAll);

// Create New Group
router.post('/api/group', Middleware.isLoggedIn, GroupCtrl.createNewGroup);

// Update Group details
router.put('/api/group/:id/edit', Middleware.isLoggedIn, Middleware.isAuthorized, GroupCtrl.updateOneGroup);

// Delete Group details
router.delete('/api/group/:id/delete', Middleware.isLoggedIn, Middleware.isAuthorized, GroupCtrl.deleteOneGroup);

export default router;
