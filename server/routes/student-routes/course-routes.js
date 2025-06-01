/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
} from '../../controllers/student-controllers/course-controller';

// Router Initialization
const router = express.Router();

// Routes
router.get('/get', getAllStudentViewCourses);
router.get('/get/details/:id', getStudentViewCourseDetails);

// Export
export default router;
