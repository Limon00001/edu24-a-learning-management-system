/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { fetchStudentBoughtCoursesService } from '@/services';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from '../auth-context';

const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentViewCoursesLists, setStudentViewCoursesLists] = useState([]);
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]);
  const { auth } = useContext(AuthContext);

  const refreshEnrollments = useCallback(async (userId) => {
    try {
      const { data } = await fetchStudentBoughtCoursesService(userId);
      if (data?.success) {
        setStudentBoughtCoursesList(data.payload);
      }
    } catch (error) {
      console.error('Error refreshing enrollments:', error);
    }
  }, []);

  useEffect(() => {
    if (auth?.user?.id) {
      refreshEnrollments(auth.user.id);
    }
  }, [auth?.user?.id, refreshEnrollments]);

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
