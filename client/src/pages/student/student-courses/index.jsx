/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 04 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Watch } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import { fetchStudentBoughtCoursesService } from '@/services';

const StudentCoursesPage = () => {
  const { auth } = useContext(AuthContext);
  const {
    studentBoughtCoursesList,
    setStudentBoughtCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentBoughtCourses = async () => {
      setLoadingState(true);

      try {
        const { data } = await fetchStudentBoughtCoursesService(auth?.user?.id);

        if (data?.success) {
          // Store only unique courses based on courseId
          const uniqueCourses = Array.from(
            new Map(data.payload.map((item) => [item.courseId, item])).values(),
          );

          setStudentBoughtCoursesList(uniqueCourses);
        }
      } catch (error) {
        console.error('Error fetching student bought courses:', error);
      } finally {
        setLoadingState(false);
      }
    };

    if (auth?.user?.id) {
      fetchStudentBoughtCourses();
    }
  }, [auth?.user?.id, setStudentBoughtCoursesList, setLoadingState]);

  console.log(studentBoughtCoursesList);

  if (loadingState) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Watch className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!auth?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl text-gray-700">
          Please log in to view your courses.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-3">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card
              key={course.id}
              onClick={() => navigate(`/course-progress/${course.courseId}`)}
              className="flex flex-col border-none shadow-md"
            >
              <CardContent className="flex-grow">
                <img
                  src={course.courseImage}
                  alt={course.courseTitle}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course.courseTitle}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course.courseInstructor}
                </p>
                <p className="text-xs text-gray-500">
                  Level:{' '}
                  <span className="font-semibold">
                    {course.courseLevel.toUpperCase()}
                  </span>
                </p>
              </CardContent>
              <CardFooter className="pt-4 pb-5 px-4">
                <Button
                  className="w-full bg-gradient-to-r from-primary/90 to-primary 
    hover:from-primary hover:to-primary/90 
    transform transition-all duration-300 
    hover:scale-[1.02] active:scale-[0.98]
    shadow-md hover:shadow-lg
    text-white font-semibold
    flex items-center justify-center gap-2
    py-6 cursor-pointer"
                >
                  Continue Learning
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-md text-gray-700">No Courses Found</h1>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
