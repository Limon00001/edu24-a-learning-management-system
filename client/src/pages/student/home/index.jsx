/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext, useEffect } from 'react';

// Internal Imports
import { Button } from '@/components/ui/button';
import { courseCategories } from '@/config';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseListService } from '@/services';
import banner from '/banner_2.png';

// Component
const StudentHomePage = () => {
  const { auth } = useContext(AuthContext);
  const { studentViewCoursesLists, setStudentViewCoursesLists } =
    useContext(StudentContext);

  useEffect(() => {
    const fetchAllStudentViewCourses = async () => {
      const { data } = await fetchStudentViewCourseListService();

      if (data?.success) setStudentViewCoursesLists(data?.payload);
    };

    fetchAllStudentViewCourses();
  }, [setStudentViewCoursesLists]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-12 px-4 lg:px-8 gap-8">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Welcome back, {auth?.user?.userName}!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to continue your learning journey? Explore your courses, track
            progress, and unlock new skills today.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition">
              Resume Learning
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-lg font-semibold cursor-pointer transition">
              Browse Courses
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute -z-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          <img
            src={banner}
            alt="Welcome Image"
            className="w-full h-auto rounded-2xl object-cover transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Your Learning Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              variant={'outline'}
              className="justify-start border-none cursor-pointer hover:bg-primary/5 transition-colors"
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesLists && studentViewCoursesLists.length > 0 ? (
            studentViewCoursesLists.map((courseItem) => (
              <div className="rounded-lg overflow-hidden shadow cursor-pointer">
                <img
                  src={courseItem?.image}
                  alt="courses"
                  className="w-full h-40 object-cover"
                />
                <div className="flex items-center justify-between px-4 py-2">
                  <h3 className="font-bold w-2/3">{courseItem?.title}</h3>
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                </div>
                <p className="text-gray-600 text-sm px-4 pb-2">
                  <span className="font-semibold">Instructor: </span>
                  {courseItem?.instructorName}
                </p>
              </div>
            ))
          ) : (
            <h1 className="text-md text-gray-700">No courses found</h1>
          )}
        </div>
      </section>
    </div>
  );
};

// Export
export default StudentHomePage;
