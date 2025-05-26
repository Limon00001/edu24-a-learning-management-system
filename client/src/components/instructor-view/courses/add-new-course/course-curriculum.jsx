/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext } from 'react';

// Internal Imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { courseCurriculumInitialFormData } from '@/config';
import { InstructorContext } from '@/context/instructor-context';

// Component
const CourseCurriculum = () => {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(InstructorContext);

  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };

  return (
    <Card className={'border-none'}>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture} className="cursor-pointer">
          Add Lecture
        </Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border-2 border-gray-400 p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96 focus-visible:border-1 focus-visible:ring-0"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={false}
                    id={`freePreview-${index + 1}`}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input type="file" accept="video/*" className="mb-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Export
export default CourseCurriculum;
