/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Fragment } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Route Guard
const RouteGuard = ({ authenticated, user, element }) => {
  const location = useLocation();

  if (!authenticated && !location.pathname.includes('/auth')) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== 'instructor' &&
    (location.pathname.includes('/instructor') ||
      location.pathname.includes('/auth'))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user?.role === 'instructor' &&
    !location.pathname.includes('/instructor')
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment>{element}</Fragment>;
};

// Export
export default RouteGuard;
