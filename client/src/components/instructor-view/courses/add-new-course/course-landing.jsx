/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext } from 'react';

// Internal Imports
import FormControls from '@/components/common-form/form-controls';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { courseLandingPageFormControls } from '@/config';
import { InstructorContext } from '@/context/instructor-context';

// Component
const CourseLanding = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  return (
    <Card className={'border-none'}>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
};

// Export
export default CourseLanding;
