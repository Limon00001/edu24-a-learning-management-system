/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// Internal Imports
import RouteGuard from './components/route-guardindex';
import StudentViewCommonLayout from './components/student-view/common-layout';
import PaymentSuccessPage from './components/student-view/payment-success';
import { Toaster } from './components/ui/sonner';
import { AuthContext } from './context/auth-context';
import AuthPage from './pages/auth';
import InstructorDashboardPage from './pages/instructor';
import AddNewCoursePage from './pages/instructor/add-new-course';
import NotFoundPage from './pages/not-found';
import StudentViewCourseDetailsPage from './pages/student/course-details';
import StudentViewCourseProgressPage from './pages/student/course-progress';
import StudentViewCoursesPage from './pages/student/courses';
import StudentHomePage from './pages/student/home';
import StudentCoursesPage from './pages/student/student-courses';

// App Component
function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<AuthPage />}
            />
          }
        />
        <Route
          path="/instructor"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<InstructorDashboardPage />}
            />
          }
        />
        <Route
          path="/instructor/create-new-course"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<AddNewCoursePage />}
            />
          }
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<AddNewCoursePage />}
            />
          }
        />
        <Route
          path="/"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<StudentViewCommonLayout />}
            />
          }
        >
          <Route path="" element={<StudentHomePage />} />
          <Route path="/home" element={<StudentHomePage />} />
          <Route path="/courses" element={<StudentViewCoursesPage />} />
          <Route
            path="/course/details/:id"
            element={<StudentViewCourseDetailsPage />}
          />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/student-courses" element={<StudentCoursesPage />} />
          <Route
            path="/course-progress/:id"
            element={<StudentViewCourseProgressPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster richColors />
    </>
  );
}

// Export
export default App;
