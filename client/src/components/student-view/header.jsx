/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 05 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import { BookOpen, GraduationCap, LogOut, Menu, User } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Internal imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthContext } from '@/context/auth-context';
import { Button } from '../ui/button';

// Component
const StudentViewCommonHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials, auth } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle logout functionality
  const handleLogout = () => {
    resetCredentials();
    localStorage.clear();
  };

  // Check if the current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Explore Courses', path: '/courses' },
    { label: 'My Learning', path: '/student-courses' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/home"
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="hidden sm:block font-bold text-xl">
                LMS System
              </span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className={`text-base font-medium cursor-pointer transition-colors ${
                    isActiveRoute(item.path)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.path === '/courses' && (
                    <BookOpen className="mr-2 h-4 w-4" />
                  )}
                  {item.label}
                </Button>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block font-medium">
                    {auth?.user?.userName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-none" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className={'cursor-pointer'}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${
              mobileMenuOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
            }
          `}
        >
          <div
            className={`
            py-2 space-y-1 transition-all duration-300
            ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'}
          `}
          >
            {navItems.map((item, index) => (
              <div
                key={item.path}
                className="transition-all duration-300"
                style={{
                  transform: mobileMenuOpen
                    ? 'translateX(0)'
                    : 'translateX(-1rem)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full justify-start text-base ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600'
                  }`}
                >
                  {item.path === '/courses' && (
                    <BookOpen className="mr-2 h-4 w-4" />
                  )}
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

// Export
export default StudentViewCommonHeader;
