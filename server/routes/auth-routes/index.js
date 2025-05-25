/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 24 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import express from 'express';

// Internal imports
import {
  checkAuth,
  loginUser,
  registerUser,
} from '../../controllers/auth-controller/index.js';
import authenticate from '../../middlewares/authMiddleware.js';

// Router instance
const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-auth', authenticate, checkAuth);

// Exports
export default router;
