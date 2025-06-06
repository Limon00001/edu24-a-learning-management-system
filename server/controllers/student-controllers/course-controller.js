/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import createError from 'http-errors';

// Internal Imports
import prisma from '../../prisma/index.js';
import { successResponse } from '../responseController.js';

// Helper function for sorting
const getOrderByClause = (sortBy) => {
  switch (sortBy) {
    case 'price-lowtohigh':
      return { pricing: 'asc' };
    case 'price-hightolow':
      return { pricing: 'desc' };
    case 'newest':
      return { createdAt: 'desc' };
    case 'oldest':
      return { createdAt: 'asc' };
    default:
      return { pricing: 'asc' };
  }
};

// Controller
const getAllStudentViewCourses = async (req, res, next) => {
  try {
    const {
      category = '',
      level = '',
      primaryLanguage = '',
      sortBy = 'price-lowtohigh',
    } = req.query;

    // Get the authenticated user ID from req.user
    const userId = req.user?.id;

    // Build where clause
    let where = {
      isPublished: true,
    };

    // Add filters
    if (category) {
      where.category = { in: category.split(',') };
    }
    if (level) {
      where.level = { in: level.split(',') };
    }
    if (primaryLanguage) {
      where.primaryLanguage = { in: primaryLanguage.split(',') };
    }

    // Get courses
    const courseList = await prisma.course.findMany({
      where,
      orderBy: getOrderByClause(sortBy),
      include: {
        curriculum: true,
        students: {
          where: {
            studentId: userId,
            paymentStatus: 'completed',
          },
          select: {
            courseId: true,
            paymentStatus: true,
          },
        },
      },
    });

    // Add purchased status to each course
    const coursesWithEnrollmentStatus = courseList.map((course) => ({
      ...course,
      isEnrolled: course.students.length > 0,
      students: undefined, // Remove students array from response
    }));

    successResponse(res, {
      statusCode: 200,
      message: 'Courses fetched successfully',
      payload: coursesWithEnrollmentStatus,
    });
  } catch (error) {
    return next(createError(500, `Error fetching courses: ${error.message}`));
  }
};

const getStudentViewCourseDetails = async (req, res, next) => {
  const { id, studentId } = req.params;

  try {
    const courseDetails = await prisma.course.findUnique({
      where: { id },
      include: {
        curriculum: true,
        students: {
          where: {
            studentId: studentId,
            paymentStatus: 'completed',
          },
        },
      },
    });

    if (!courseDetails) {
      return next(createError(404, 'Course details not found'));
    }

    // Check enrollment status
    const isEnrolled = courseDetails.students.length > 0;

    // Prepare response based on enrollment
    const response = {
      ...courseDetails,
      isEnrolled,
      curriculum: courseDetails.curriculum.map((lecture) => ({
        ...lecture,
        videoUrl: isEnrolled
          ? lecture.videoUrl
          : lecture.freePreview
          ? lecture.videoUrl
          : null,
        isLocked: !isEnrolled && !lecture.freePreview,
      })),
    };

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Course details fetched successfully',
      payload: response,
    });
  } catch (error) {
    return next(
      createError(500, `Error fetching course details ${error.message}`),
    );
  }
};

// Export
export { getAllStudentViewCourses, getStudentViewCourseDetails };
