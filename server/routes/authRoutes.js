import express from 'express';
import AuthCtrl from './../controllers/authCtrl';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up logic
router.post('/api/user/register', AuthCtrl.register);

// Login logic

router.post('/api/user/login', AuthCtrl.login);

// Add logout route
router.get('/api/user/logout', AuthCtrl.logout);

export default router;
