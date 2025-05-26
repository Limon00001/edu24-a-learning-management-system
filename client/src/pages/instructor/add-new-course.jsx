/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import CourseCurriculum from '@/components/instructor-view/courses/add-new-course/course-curriculum';
import CourseLanding from '@/components/instructor-view/courses/add-new-course/course-landing';
import CourseSettings from '@/components/instructor-view/courses/add-new-course/course-settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// New Course Page
const AddNewCoursePage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Add New Course</h1>
        <Button
          className={
            'font-semibold tracking-wider text-sm px-8 uppercase rounded-full'
          }
        >
          Submit
        </Button>
      </div>
      <Card className={'border-none mt-5'}>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum" className={'cursor-pointer'}>
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="course-landing-page"
                  className={'cursor-pointer'}
                >
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings" className={'cursor-pointer'}>
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Export
export default AddNewCoursePage;
