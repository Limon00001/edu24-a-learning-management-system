/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 04 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import createError from 'http-errors';

// Internal Imports
import prisma from '../../prisma/index.js';
import { successResponse } from '../responseController.js';

const getCourseProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Get course with curriculum
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        curriculum: true,
        students: {
          where: {
            studentId: userId,
            paymentStatus: 'completed',
          },
        },
      },
    });

    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    // Return course data with enrollment info
    successResponse(res, {
      statusCode: 200,
      message: 'Course progress fetched successfully',
      payload: {
        ...course,
        enrollment: req.enrollment,
      },
    });
  } catch (error) {
    return next(
      createError(500, `Error fetching course progress: ${error.message}`),
    );
  }
};

// Export
export { getCourseProgress };
