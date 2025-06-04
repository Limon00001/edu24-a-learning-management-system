/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 04 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import { getCoursesByStudentId } from '../../controllers/student-controllers/student-courses-controller.js';

// Router Initialization
const router = express.Router();

// Routes
router.get('/get/:studentId', getCoursesByStudentId);

// Export
export default router;
