/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 04 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import createError from 'http-errors';

// Internal imports
import prisma from '../prisma/index.js';

export const checkCourseAccess = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const enrollment = await prisma.student.findFirst({
      where: {
        courseId,
        studentId: userId,
        paymentStatus: 'completed',
      },
    });

    if (!enrollment) {
      return next(createError(403, 'Access denied: Course not purchased'));
    }

    req.enrollment = enrollment;
    next();
  } catch (error) {
    next(createError(500, 'Error checking course access'));
  }
};

export const checkDynamicCourseAccess = async (req, res, next) => {
  try {
    const { id, studentId } = req.params;

    // Check if course is purchased
    const enrollment = await prisma.student.findFirst({
      where: {
        courseId: id,
        studentId,
        paymentStatus: 'completed',
      },
    });

    if (enrollment) {
      return res.redirect(`/course-progress/${id}`);
    }

    // If not purchased, continue to course details
    next();
  } catch (error) {
    next(error);
  }
};
