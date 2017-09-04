import express from 'express';
import Middleware from './../utils/middlewares';
import AuthCtrl from './../controllers/authCtrl';
import GoogleAuthCtrl from './../controllers/googleauthCtrl';

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

// Google SignUp
router.post('/api/v1/user/googlesignup', GoogleAuthCtrl.googleRegister);

// Google login
router.post('/api/v1/user/googlelogin', GoogleAuthCtrl.googleLogin);


export default router;
