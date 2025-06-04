/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { createContext, useState } from 'react';

const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentViewCoursesLists, setStudentViewCoursesLists] = useState([]);
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]);

  const value = {
    studentViewCoursesLists,
    setStudentViewCoursesLists,
    loadingState,
    setLoadingState,
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    studentBoughtCoursesList,
    setStudentBoughtCoursesList,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

// Export
export { StudentContext, StudentProvider };
