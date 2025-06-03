/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 03 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import {
  createCheckoutSession,
  verifyPayment,
} from '../../controllers/student-controllers/payment-controller.js';
import authenticate from '../../middlewares/authMiddleware.js';

// Router Initialization
const router = express.Router();

// Routes
router.post('/create-checkout-session', authenticate, createCheckoutSession);
router.get('/verify/:sessionId', authenticate, verifyPayment);

// Export
export default router;
