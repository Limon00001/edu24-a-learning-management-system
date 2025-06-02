/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 24 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal imports
import axiosInstance from '@/api/axiosInstance';

// Services
const registerService = async (formData) => {
  const { data } = await axiosInstance.post('/auth/register', formData);

  return data;
};

const loginService = async (formData) => {
  const { data } = await axiosInstance.post('/auth/login', formData);

  return data;
};

const checkAuthService = async () => {
  const { data } = await axiosInstance.get('/auth/check-auth');

  return data;
};

const mediaUploadService = async (formData, onProgressCallback) => {
  const { data } = await axiosInstance.post('/media/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      onProgressCallback(percentage);
    },
  });

  return data;
};

const mediaBulkUploadService = async (formData, onProgressCallback) => {
  const { data } = await axiosInstance.post('/media/bulk-upload', formData, {
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      onProgressCallback(percentage);
    },
  });

  return data;
};

const mediaDeleteService = async (id) => {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
};

const fetchInstructorCourseListService = async () => {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
};

const addNewCourseService = async (formData) => {
  const data = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
};

const fetchInstructorCourseDetailsService = async (id) => {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`,
  );

  return data;
};

const updateCourseByIdService = async (id, formData) => {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData,
  );

  return data;
};

const deleteLectureService = async (courseId, lectureId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/instructor/course/${courseId}/lecture/${lectureId}`,
    );
    return data;
  } catch (error) {
    console.error('Delete lecture service error:', error);
    throw error;
  }
};

const fetchStudentViewCourseListService = async (query) => {
  try {
    const { data } = await axiosInstance.get(
      `/student/course/get${query ? `?${query}` : ''}`,
    );

    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const fetchStudentViewCourseDetailsService = async (courseId) => {
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${courseId}`,
  );

  return data;
};

// Exports
export {
  addNewCourseService,
  checkAuthService,
  deleteLectureService,
  fetchInstructorCourseDetailsService,
  fetchInstructorCourseListService,
  fetchStudentViewCourseDetailsService,
  fetchStudentViewCourseListService,
  loginService,
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
  registerService,
  updateCourseByIdService,
};
