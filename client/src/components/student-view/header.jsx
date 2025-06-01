/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { GraduationCap, TvMinimalPlay } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Internal Imports
import { AuthContext } from '@/context/auth-context';
import { Button } from '../ui/button';

// Component
const StudentViewCommonHeader = () => {
  const { resetCredentials } = useContext(AuthContext);

  const handleLogout = () => {
    resetCredentials();
    localStorage.clear();
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-sm relative">
      <div className="flex items-center space-x-4">
        <Link to={'/home'} className="flex items-center">
          <GraduationCap className="w-8 h-8 mr-4" />
          <span className="font-extrabold md:text-xl text-[14px] uppercase tracking-wider">
            LMS System
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant={'ghost'}
            className="text-[14px] md:text-[16px] font-medium cursor-pointer"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            <span className="font-extrabold md:text-xl text-[14px] uppercase tracking-wider">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button
            onClick={handleLogout}
            className="text-[14px] md:text-[16px] cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

// Export
export default StudentViewCommonHeader;
