/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useNavigate } from 'react-router-dom';

// Internal Imports
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
import { Edit, Trash } from 'lucide-react';

const InstructorCourses = ({ listOfCourses }) => {
  const navigate = useNavigate();

  return (
    <Card className="border-none">
      <CardHeader className={'flex flex-row justify-between items-center'}>
        <CardTitle className={'text-3xl font-extrabold'}>Card Title</CardTitle>
        <Button
          onClick={() => navigate('/instructor/create-new-course')}
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
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0 ? (
                listOfCourses.map((course) => (
                  <TableRow key={course?.id}>
                    <TableCell className="font-medium">
                      {course?.title}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(course?.students)
                        ? course.students.length
                        : 0}
                    </TableCell>
                    <TableCell>${course?.pricing}</TableCell>
                    <TableCell className="text-right pr-0 flex justify-end">
                      <Button variant={'ghost'} className="px-2 cursor-pointer">
                        <Edit className="w-6 h-6" />
                      </Button>
                      <Button variant={'ghost'} className={'cursor-pointer'}>
                        <Trash className="w-6 h-6 text-red-700" />
                      </Button>
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
