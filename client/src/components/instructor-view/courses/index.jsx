/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Edit, Trash } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Internal Imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from '@/config';
import { AuthContext } from '@/context/auth-context';
import { InstructorContext } from '@/context/instructor-context';
import { deleteCourseByInstructorService } from '@/services';

const InstructorCourses = ({ listOfCourses }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    setInstructorCoursesList,
  } = useContext(InstructorContext);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if the course belongs to the instructor
  const isOwnCourse = (courseInstructorId) => {
    return courseInstructorId === auth?.user?.id;
  };

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      setIsDeleting(true);

      // Delete the course
      const { data } = await deleteCourseByInstructorService(courseId);

      // Check if deletion was successful
      if (data?.success) {
        toast.success('Course deleted successfully');
        // Update courses list by filtering out the deleted course
        setInstructorCoursesList((prev) =>
          prev.filter((course) => course.id !== courseId),
        );
      } else {
        toast.error(data.message || 'Failed to delete course');
      }
    } catch (error) {
      toast.error('Error deleting course');
      console.error('Delete course error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className={'flex flex-row justify-between items-center'}>
        <CardTitle className={'text-3xl font-extrabold'}>Courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            setCourseLandingFormData(courseLandingInitialFormData);
            navigate('/instructor/create-new-course');
          }}
          className={'p-6 cursor-pointer'}
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0 ? (
                listOfCourses.map((course) => (
                  <TableRow
                    key={course?.id}
                    className={
                      isOwnCourse(course.instructorId) ? 'bg-blue-50/50' : ''
                    }
                  >
                    <TableCell className="font-medium">
                      {course?.title}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            isOwnCourse(course.instructorId)
                              ? 'text-primary font-medium'
                              : ''
                          }
                        >
                          {course.instructorName}
                        </span>
                        {isOwnCourse(course.instructorId) && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            You
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      {Array.isArray(course?.students)
                        ? course.students.length
                        : 0}
                    </TableCell>
                    <TableCell>
                      ${course.pricing * (course.students?.length || 0)}
                    </TableCell>
                    <TableCell className="text-right pr-0 flex justify-end gap-2">
                      {isOwnCourse(course.instructorId) ? (
                        <>
                          <Button
                            onClick={() =>
                              navigate(`/instructor/edit-course/${course?.id}`)
                            }
                            variant="ghost"
                            className="px-2 hover:bg-blue-50 cursor-pointer"
                          >
                            <Edit className="w-5 h-5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="hover:bg-red-50 cursor-pointer"
                                disabled={isDeleting}
                              >
                                <Trash className="w-5 h-5 text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete this course?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the course and
                                  remove all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className={'cursor-pointer'}>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                >
                                  {isDeleting ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          No actions available
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No courses available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Export
export default InstructorCourses;
