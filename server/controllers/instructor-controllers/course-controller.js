/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 28 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import createError from 'http-errors';

// Internal imports
import { deleteMediaFromCloudinary } from '../../helpers/cloudinary.js';
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

const deleteLectureController = async (req, res, next) => {
  const { courseId, lectureId } = req.params;

  try {
    // Find the lecture to get public_id
    const lecture = await prisma.lecture.findFirst({
      where: {
        id: lectureId,
        courseId: courseId,
      },
    });

    if (!lecture) {
      return next(createError(404, 'Lecture not found'));
    }

    // Delete from Cloudinary
    const cloudinaryResult = await deleteMediaFromCloudinary(lecture.public_id);

    if (cloudinaryResult?.result !== 'ok') {
      return next(createError(500, 'Failed to delete media from storage'));
    }

    // Delete from database
    await prisma.lecture.delete({
      where: {
        id: lectureId,
      },
    });

    // Get updated course data
    const updatedCourse = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        curriculum: true,
        // students: true,
      },
    });

    // Send success response with updated data
    successResponse(res, {
      statusCode: 200,
      message: 'Lecture deleted successfully',
      payload: {
        data: updatedCourse,
      },
    });
  } catch (error) {
    console.error('Delete lecture error:', error);
    return next(createError(500, 'Error deleting lecture'));
  }
};

// Export
export {
  addNewCourse,
  deleteLectureController,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
};
