import { Router } from 'express';
import {
  handleForgotPassword,
  handleLogin,
  handleLogout,
} from '../handlers/authHandler';

const router = Router();

router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/forgot-password', handleForgotPassword);

export default router;
