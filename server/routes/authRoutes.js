import express from 'express';
import Middleware from './../utils/middlewares';
import AuthCtrl from './../controllers/authCtrl';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up logic
router.post('/api/v1/user/register', AuthCtrl.register);

// Login logic
router.post('/api/v1/user/login', AuthCtrl.login);

// Forgot Password
router.post('/api/v1/user/forgotpassword', AuthCtrl.forgotPasswordLink);

// Reset Password
router.post('/api/v1/resetpassword', AuthCtrl.resetPassword);


export default router;
