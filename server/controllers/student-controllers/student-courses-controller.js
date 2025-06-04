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

const getCoursesByStudentId = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    // Get all enrollments
    const studentBoughtCourses = await prisma.student.findMany({
      where: {
        studentId: studentId,
        paymentStatus: 'completed',
      },
      include: {
        course: true,
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    // Filter out duplicates based on courseId
    const uniqueCourses = studentBoughtCourses.reduce((acc, current) => {
      const isDuplicate = acc.find(
        (item) => item.courseId === current.courseId,
      );
      if (!isDuplicate) {
        return [...acc, current];
      }
      return acc;
    }, []);

    successResponse(res, {
      statusCode: 200,
      message: 'Fetching student courses successfully',
      payload: uniqueCourses,
    });
  } catch (error) {
    return next(createError(500, 'Something went wrong!'));
  }
};

// Export
export { getCoursesByStudentId };
