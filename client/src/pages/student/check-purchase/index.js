/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 04 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Function to check if a student has purchased a course
const checkCoursePurchase = (studentId, courseId, studentBoughtCoursesList) => {
  if (!studentBoughtCoursesList || !studentId || !courseId) return false;

  return studentBoughtCoursesList.some(
    (course) =>
      course.courseId === courseId && course.paymentStatus === 'completed',
  );
};

// Export
export default checkCoursePurchase;
