/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal Imports
import CourseCurriculum from '@/components/instructor-view/courses/add-new-course/course-curriculum';
import CourseLanding from '@/components/instructor-view/courses/add-new-course/course-landing';
import CourseSettings from '@/components/instructor-view/courses/add-new-course/course-settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from '@/config';
import { AuthContext } from '@/context/auth-context';
import { InstructorContext } from '@/context/instructor-context';
import { addNewCourseService } from '@/services';

// New Course Page
const AddNewCoursePage = () => {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const isEmpty = (value) => {
    if (Array.isArray(value)) return value.length === 0;

    return value === '' || value === null || value === undefined;
  };

  const validateFormData = () => {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) return false;
    }

    let hasPreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.videoUrl) ||
        isEmpty(item.title) ||
        isEmpty(item.public_id)
      )
        return false;

      if (item.freePreview) hasPreview = true;
    }

    return hasPreview;
  };

  const handleCreateCourse = async () => {
    const courseFinalFormData = {
      instructorId: auth?.user?.id,
      instructorName: auth?.user?.userName,
      date: new Date().toISOString(),
      ...courseLandingFormData,
      pricing: parseFloat(courseLandingFormData.pricing),
      curriculum: courseCurriculumFormData.map((item) => ({
        title: item.title,
        videoUrl: item.videoUrl,
        public_id: item.public_id,
        freePreview: item.freePreview,
      })),
      isPublished: true,
    };

    try {
      const { data } = await addNewCourseService(courseFinalFormData);

      if (data?.data?.success) {
        setCourseLandingFormData(courseLandingInitialFormData);
        setCourseCurriculumFormData(courseCurriculumInitialFormData);
        navigate(-1);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Add New Course</h1>
        <Button
          disabled={!validateFormData()}
          className={
            'font-semibold tracking-wider text-sm px-8 uppercase rounded-full'
          }
          onClick={handleCreateCourse}
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
