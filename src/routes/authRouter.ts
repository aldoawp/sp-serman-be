import { Router } from 'express';
import {
  handleLogin,
  // handleForgotPassword,
  // handleLogout,
} from '../handlers/authHandler';

const router = Router();

router.post('/login', handleLogin);
// router.post('/logout', handleLogout);
// router.post('/forgot-password', handleForgotPassword);

export default router;
