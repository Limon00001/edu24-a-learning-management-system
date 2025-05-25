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
import { AuthContext } from './context/auth-context';
import AuthPage from './pages/auth';
import InstructorDashboardPage from './pages/instructor';
import NotFoundPage from './pages/not-found';
import StudentHomePage from './pages/student/home';

// App Component
function App() {
  const { auth } = useContext(AuthContext);

  return (
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
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Export
export default App;
