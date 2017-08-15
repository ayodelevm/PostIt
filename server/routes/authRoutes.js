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


export default router;
