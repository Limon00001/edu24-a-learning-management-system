/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import {
  BookOpen,
  Clock,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Internal Imports
import { Card } from '@/components/ui/card';
import { InstructorContext } from '@/context/instructor-context';

// Instructor Dashboard Component
const InstructorDashboard = () => {
  const { instructorCoursesList } = useContext(InstructorContext);
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    totalCourses: 0,
    completionRate: 0,
  });

  // Calculate dashboard stats when instructorCoursesList changes
  useEffect(() => {
    if (instructorCoursesList?.length > 0) {
      const stats = instructorCoursesList.reduce(
        (acc, course) => ({
          totalStudents: acc.totalStudents + (course.students?.length || 0),
          totalRevenue:
            acc.totalRevenue + course.pricing * (course.students?.length || 0),
          totalCourses: acc.totalCourses + 1,
          completionRate:
            acc.completionRate +
            (course.students?.filter((s) => s.progress === 100)?.length || 0) /
              (course.students?.length || 1),
        }),
        {
          totalStudents: 0,
          totalRevenue: 0,
          totalCourses: 0,
          completionRate: 0,
        },
      );

      stats.completionRate =
        (stats.completionRate / instructorCoursesList.length) * 100;
      setDashboardStats(stats);
    }
  }, [instructorCoursesList]);

  // Prepare data for charts
  const revenueData =
    instructorCoursesList?.map((course) => ({
      name: course.title?.substring(0, 20) + '...',
      revenue: course.pricing * (course.students?.length || 0),
      students: course.students?.length || 0,
    })) || [];

  // Group courses by level and count students
  const coursesByLevel = instructorCoursesList?.reduce((acc, course) => {
    acc[course.level] =
      (acc[course.level] || 0) + (course.students?.length || 0);
    return acc;
  }, {});

  // Prepare data for students by level chart
  const levelData = Object.entries(coursesByLevel || {}).map(
    ([level, count]) => ({
      level,
      students: count,
    }),
  );

  return (
    <div className="space-y-8 p-6 bg-gray-50/50">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100/80 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total Students
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {dashboardStats.totalStudents}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold">
                ${dashboardStats.totalRevenue}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <h3 className="text-2xl font-bold">
                {dashboardStats.totalCourses}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Revenue by Course
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  height={120}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                <Bar dataKey="students" fill="#10b981" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Students by Level */}
        <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            Students by Level
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Students"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Courses */}
      <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Clock className="h-5 w-5 text-indigo-600" />
            Recent Courses
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCoursesList?.slice(0, 3).map((course) => (
            <Card
              key={course.id}
              className="group border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
              onClick={() => navigate(`/instructor/edit-course/${course.id}`)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">
                  {course.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                    <Users className="h-4 w-4" />
                    {course.students?.length || 0} students
                  </span>
                  <span className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-md text-green-700">
                    <DollarSign className="h-4 w-4" />
                    {course.pricing}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Export
export default InstructorDashboard;
