import express from 'express';
import Middleware from './../utils/middlewares';
import AuthCtrl from './../controllers/authCtrl';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up logic
router.post('/api/user/register', AuthCtrl.register);

// Login logic

router.post('/api/user/login', AuthCtrl.login);

// Update User details
router.put('/api/user/:id/edit', Middleware.isAuthenticated, AuthCtrl.updateOneUser);


export default router;
