/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 28 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import express from 'express';

// Internal imports
import {
  addNewCourse,
  deleteCourse,
  deleteLectureController,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
} from '../../controllers/instructor-controllers/course-controller.js';
import authenticate from '../../middlewares/authMiddleware.js';

// Router instance
const router = express.Router();

// Routes
router.post('/add', addNewCourse);
router.get('/get', getAllCourses);
router.get('/get/details/:id', getCourseDetailsById);
router.put('/update/:id', updateCourseById);
router.delete('/:courseId/lecture/:lectureId', deleteLectureController);
router.delete('/delete/:id', authenticate, deleteCourse);

// Exports
export default router;
