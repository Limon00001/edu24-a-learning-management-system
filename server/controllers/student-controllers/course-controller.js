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
    const courseList = await prisma.course.findMany({
      include: {
        students: true,
        curriculum: true,
      },
    });

    // Check if courses exist
    if (!courseList || courseList.length === 0) {
      return next(createError(404, 'No courses found'));
    }

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Courses fetched successfully',
      payload: courseList,
    });
  } catch (error) {
    return next(createError(500, `Error fetching courses ${error.message}`));
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
