/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 04 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import { getCourseProgress } from '../../controllers/student-controllers/course-progress.js';
import authenticate from '../../middlewares/authMiddleware.js';
import { checkCourseAccess } from '../../middlewares/courseAccessMiddleware.js';

// Router Initialization
const router = express.Router();

// Routes
router.get('/:courseId', authenticate, checkCourseAccess, getCourseProgress);

// Export
export default router;
