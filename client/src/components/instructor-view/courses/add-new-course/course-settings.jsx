/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// // External Imports
import { useContext } from 'react';

// Internal Imports
import MediaProgressBar from '@/components/media-progress-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InstructorContext } from '@/context/instructor-context';
import { mediaUploadService } from '@/services';

// Component
const CourseSettings = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const handleImageUploadChange = async (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) return;

    const imageFormData = new FormData();
    imageFormData.append('file', selectedImage);

    try {
      setMediaUploadProgress(true);
      const { data } = await mediaUploadService(
        imageFormData,
        setMediaUploadProgressPercentage,
      );

      if (!data?.success) {
        throw new Error('Failed to upload image');
      }

      setCourseLandingFormData({
        ...courseLandingFormData,
        image: data?.payload?.data?.url,
      });
      setMediaUploadProgress(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Card className={'border-none'}>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      {mediaUploadProgress ? (
        <MediaProgressBar
          isMediaUploading={mediaUploadProgress}
          progress={mediaUploadProgressPercentage}
        />
      ) : null}
      <CardContent>
        {courseLandingFormData.image ? (
          <img
            src={courseLandingFormData.image}
            alt="Course"
            className="w-[90vw] h-[70vh]"
          />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleImageUploadChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Export
export default CourseSettings;
