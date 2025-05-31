/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 28 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import createError from 'http-errors';

// Internal imports
import prisma from '../../prisma/index.js';
import { successResponse } from '../responseController.js';

// Controllers
const addNewCourse = async (req, res, next) => {
  const courseData = req.body;
  try {
    const { curriculum, ...mainCourseData } = courseData;

    const newlyCreatedCourse = await prisma.course.create({
      data: {
        ...mainCourseData,
        curriculum: {
          create: curriculum,
        },
        students: {
          create: [],
        },
      },
      include: {
        curriculum: true,
        students: true,
      },
    });

    // Response
    successResponse(res, {
      statusCode: 201,
      message: 'Course added successfully',
      payload: {
        data: newlyCreatedCourse,
      },
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, `Error adding new course ${error.message}`));
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const allCourses = await prisma.course.findMany({
      include: {
        students: true,
        curriculum: true,
      },
    });

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Courses fetched successfully',
      payload: {
        data: allCourses,
      },
    });
  } catch (error) {
    return next(createError(500, 'Error fetching courses'));
  }
};

const getCourseDetailsById = async (req, res, next) => {
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
      return next(createError(404, 'Course not found'));
    }

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Course details fetched successfully',
      payload: {
        data: courseDetails,
      },
    });
  } catch (error) {
    return next(createError(500, 'Error fetching course details'));
  }
};

const updateCourseById = async (req, res, next) => {
  const { id } = req.params;
  const courseData = req.body;

  try {
    const { curriculum, ...mainCourseData } = courseData;

    // First delete existing curriculum
    await prisma.lecture.deleteMany({
      where: {
        courseId: id,
      },
    });

    // Update course with new curriculum
    const updatedCourse = await prisma.course.update({
      where: {
        id,
      },
      data: {
        ...mainCourseData,
        curriculum: {
          create: curriculum.map(
            ({ id, courseId, createdAt, updatedAt, ...lectureData }) =>
              lectureData,
          ),
        },
      },
      include: {
        curriculum: true,
        students: true,
      },
    });

    if (!updatedCourse) {
      return next(createError(404, 'Course not found'));
    }

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Course updated successfully',
      payload: {
        data: updatedCourse,
      },
    });
  } catch (error) {
    return next(createError(500, `Error updating course ${error}`));
  }
};

// Export
export { addNewCourse, getAllCourses, getCourseDetailsById, updateCourseById };
