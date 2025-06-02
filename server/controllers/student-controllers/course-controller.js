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

// Controller
const getAllStudentViewCourses = async (req, res, next) => {
  try {
    const {
      category = '',
      level = '',
      primaryLanguage = '',
      sortBy = 'price-lowtohigh',
    } = req.query;

    // Build where clause
    let where = {
      isPublished: true, // Only show published courses
    };

    if (category) {
      where.category = {
        in: category.split(','),
      };
    }

    if (level) {
      where.level = {
        in: level.split(','),
      };
    }

    if (primaryLanguage) {
      where.primaryLanguage = {
        in: primaryLanguage.split(','),
      };
    }

    // Build orderBy clause
    let orderBy = {};
    switch (sortBy) {
      case 'price-lowtohigh':
        orderBy = { pricing: 'asc' };
        break;
      case 'price-hightolow':
        orderBy = { pricing: 'desc' };
        break;
      case 'title-ztoa':
        orderBy = { title: 'desc' };
        break;
      case 'title-atoz':
        orderBy = { title: 'asc' };
        break;
      default:
        orderBy = { pricing: 'asc' };
    }

    const courseList = await prisma.course.findMany({
      where,
      orderBy,
      include: {
        curriculum: true,
      },
    });

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Courses fetched successfully',
      payload: courseList,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return next(createError(500, `Error fetching courses: ${error.message}`));
  }
};

const getStudentViewCourseDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const courseDetails = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        students: true,
        curriculum: true,
      },
    });

    if (!courseDetails) {
      return next(createError(404, 'Course details not found'));
    }

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Course details fetched successfully',
      payload: courseDetails,
    });
  } catch (error) {
    return next(
      createError(500, `Error fetching course details ${error.message}`),
    );
  }
};

// Export
export { getAllStudentViewCourses, getStudentViewCourseDetails };
