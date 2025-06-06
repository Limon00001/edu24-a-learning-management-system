/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 06 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import testController from '../../controllers/test-controller/index.js';

// Router Initialization
const router = express.Router();

// Routes
router.get('/', testController);

// Export
export default router;
