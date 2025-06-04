/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { GraduationCap, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Internal Imports
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <GraduationCap className="h-12 w-12" />
          <span className="text-2xl font-bold text-gray-900 ml-2 tracking-wider">
            LMS System
          </span>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/courses')}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Browse Courses
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-12">
          <div className="absolute -z-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          <div className="text-6xl font-bold text-gray-200 select-none">
            ¯\_(ツ)_/¯
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default NotFoundPage;
