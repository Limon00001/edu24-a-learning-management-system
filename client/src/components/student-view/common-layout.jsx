/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Outlet } from 'react-router-dom';
import StudentViewCommonHeader from './header';

// Common Layout Component
const StudentViewCommonLayout = () => {
  return (
    <div>
      <StudentViewCommonHeader />
      <Outlet />
    </div>
  );
};

// Export
export default StudentViewCommonLayout;
