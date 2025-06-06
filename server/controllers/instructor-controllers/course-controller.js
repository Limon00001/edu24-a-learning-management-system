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

    // Extract image data
    const courseWithImageId = {
      ...mainCourseData,
      image_public_id: mainCourseData.public_id,
    };

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

    // Extract image data
    const courseWithImageId = {
      ...mainCourseData,
      image_public_id: mainCourseData.public_id,
    };

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

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    // Check if course exists and belongs to the instructor
    const course = await prisma.course.findFirst({
      where: {
        id,
        instructorId,
      },
      include: {
        curriculum: true,
      },
    });

    if (!course) {
      return next(createError(404, 'Course not found or unauthorized'));
    }

    const mediaToDelete = {
      courseImage: course.image_public_id,
      lectureVideos: course.curriculum
        .filter((lecture) => lecture.public_id)
        .map((lecture) => lecture.public_id),
    };

    // First delete all lectures
    await prisma.$transaction(async (prisma) => {
      // Delete lectures
      await prisma.lecture.deleteMany({
        where: {
          courseId: id,
        },
      });

      // Delete student enrollments
      await prisma.student.deleteMany({
        where: {
          courseId: id,
        },
      });

      // Delete the course
      await prisma.course.delete({
        where: {
          id,
        },
      });
    });

    const deleteMediaPromises = [];

    if (mediaToDelete.courseImage) {
      deleteMediaPromises.push(
        deleteMediaFromCloudinary(mediaToDelete.courseImage)
          .then((result) => {
            console.log('Course image deletion result:', result);
            return result;
          })
          .catch((error) => {
            console.error('Failed to delete course image:', error);
            return null;
          }),
      );
    }

    // Add lecture videos deletion
    mediaToDelete.lectureVideos.forEach((publicId) => {
      deleteMediaPromises.push(
        deleteMediaFromCloudinary(publicId).catch((error) => {
          console.error(`Failed to delete lecture video ${publicId}:`, error);
          return null;
        }),
      );
    });

    // Wait for all media deletions to complete
    const results = await Promise.allSettled(deleteMediaPromises);

    // Delete course thumbnail if exists
    if (course.thumbnail_public_id) {
      try {
        await deleteMediaFromCloudinary(course.thumbnail_public_id);
      } catch (error) {
        console.error('Failed to delete course thumbnail:', error);
      }
    }

    successResponse(res, {
      statusCode: 200,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    return next(createError(500, `Error deleting course: ${error.message}`));
  }
};

// Export
export {
  addNewCourse,
  deleteCourse,
  deleteLectureController,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
};
