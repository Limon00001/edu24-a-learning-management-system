/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  TrendingUp,
  Verified,
} from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal Imports
import { Button } from '@/components/ui/button';
import { courseCategories } from '@/config';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseListService } from '@/services';
import banner from '/banner_2.png';

// Component
const StudentHomePage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const {
    studentViewCoursesLists,
    setStudentViewCoursesLists,
    studentBoughtCoursesList,
  } = useContext(StudentContext);

  useEffect(() => {
    const fetchAllStudentViewCourses = async () => {
      const { data } = await fetchStudentViewCourseListService();

      if (data?.success) setStudentViewCoursesLists(data?.payload);
    };

    fetchAllStudentViewCourses();
  }, [setStudentViewCoursesLists]);

  const data = [
    {
      label: 'Enrolled Courses',
      value: studentBoughtCoursesList?.length || 0,
    },
    {
      label: 'Available Courses',
      value: studentViewCoursesLists?.length || 0,
    },
    { label: 'Categories', value: courseCategories.length },
  ];

  const isCoursePurchased = (courseId) => {
    return studentBoughtCoursesList?.some(
      (course) =>
        course.courseId === courseId && course.paymentStatus === 'completed',
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-50/50 to-transparent" />
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-40 -bottom-40 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="container mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center justify-between py-16 px-4 lg:px-8 gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="animate-pulse w-2 h-2 rounded-full bg-green-600"></span>
                  <span className="text-primary font-medium">
                    Welcome back! 👋
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="block mb-2">Hello,</span>
                  <span className="bg-clip-text">{auth?.user?.userName}!</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Ready to continue your learning journey? Explore courses,
                  track progress, and unlock new skills today.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => navigate('/student-courses')}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl font-semibold text-lg group relative overflow-hidden shadow-lg shadow-primary/20 cursor-pointer transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Resume Learning
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button
                  onClick={() => navigate('/courses')}
                  variant="outline"
                  className="flex items-center border-2 border-primary text-primary hover:bg-gray-100 px-8 py-6 rounded-xl font-semibold text-lg transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Browse Courses
                  </span>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
                {data.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="lg:w-1/2 relative">
              <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl" />
              <div className="relative">
                <img
                  src={banner}
                  alt="Learning Illustration"
                  className="relative w-full h-auto rounded-[20px] shadow-xl transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-12 px-4 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Your Learning Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courseCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-gray-700">
                    {category.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container mx-auto py-12 px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Featured Courses
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate('/courses')}
            className="text-primary hover:text-primary/90"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesLists?.length > 0 ? (
            studentViewCoursesLists.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/details/${course.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isCoursePurchased(course.id) && (
                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                      <Verified className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Enrolled
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {course.curriculum?.length || 0} Lessons
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-gray-600 text-sm font-medium">
                      {course.instructorName}
                    </p>
                    {!isCoursePurchased(course.id) && (
                      <p className="text-lg font-bold text-primary">
                        ${course.pricing}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <h3 className="text-lg text-gray-600">No courses found</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Export
export default StudentHomePage;
