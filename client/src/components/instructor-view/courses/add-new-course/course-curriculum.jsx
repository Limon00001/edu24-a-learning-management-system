/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext, useRef } from 'react';

// Internal Imports
import MediaProgressBar from '@/components/media-progress-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import VideoPlayer from '@/components/video-player';
import { courseCurriculumInitialFormData } from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from '@/services';
import { Upload } from 'lucide-react';

// Component
const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);
  const bulkUploadInputRef = useRef(null);

  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };

  const handleCourseTitleChange = (event, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleFreePreviewChange = (currentValue, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleSingleLectureUpload = async (event, currentIndex) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const videoFormData = new FormData();
    videoFormData.append('file', selectedFile);

    try {
      setMediaUploadProgress(true);

      const { data } = await mediaUploadService(
        videoFormData,
        setMediaUploadProgressPercentage,
      );

      if (!data?.success) {
        throw new Error('Failed to upload video');
      }

      let copyCourseCurriculumFormData = [...courseCurriculumFormData];
      copyCourseCurriculumFormData[currentIndex] = {
        ...copyCourseCurriculumFormData[currentIndex],
        videoUrl: data?.payload?.data?.url,
        public_id: data?.payload?.data?.public_id,
      };
      setCourseCurriculumFormData(copyCourseCurriculumFormData);
      setMediaUploadProgress(false);
    } catch (error) {
      console.error('Error uploading video:', error);
      setMediaUploadProgress(false);
    }
  };

  const isCourseCurriculumFormDataValid = () => {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === 'object' &&
        item?.title.trim() !== '' &&
        item?.videoUrl.trim() !== ''
      );
    });
  };

  const handleReplaceVideo = async (currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      copyCourseCurriculumFormData[currentIndex]?.public_id;

    try {
      const { data } = await mediaDeleteService(getCurrentVideoPublicId);

      if (!data?.success) {
        throw new Error('Failed to replace video');
      }

      copyCourseCurriculumFormData[currentIndex] = {
        ...copyCourseCurriculumFormData[currentIndex],
        videoUrl: '',
        public_id: '',
      };

      setCourseCurriculumFormData(copyCourseCurriculumFormData);
    } catch (error) {
      console.error('Error replacing video:', error);
    }
  };

  const handleOpenBulkUpload = () => {
    bulkUploadInputRef?.current.click();
  };

  const areAllCourseCurriculumFormDataObjectsEmpty = (arr) => {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === 'boolean') return true;
        return value === '';
      });
    });
  };

  const handleMediaBulkUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (!selectedFiles) return;

    const bulkFormData = new FormData();
    selectedFiles.forEach((file) => bulkFormData.append('files', file));

    try {
      setMediaUploadProgress(true);
      const { data } = await mediaBulkUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage,
      );

      if (data?.success) {
        let copyCourseCurriculumFormData =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        const initialLength = copyCourseCurriculumFormData.length;

        copyCourseCurriculumFormData = [
          ...copyCourseCurriculumFormData,
          ...(data?.payload?.data ?? []).map((item, index) => ({
            title: `Lecture ${initialLength + (index + 1)}`,
            videoUrl: item?.url,
            public_id: item?.public_id,
            freePreview: false,
          })),
        ];
        setCourseCurriculumFormData(copyCourseCurriculumFormData);
        setMediaUploadProgress(false);
      }
    } catch (error) {
      console.error('Error uploading bulk media:', error);
    }
  };

  return (
    <Card className={'border-none'}>
      <CardHeader className={'flex justify-between items-center'}>
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
            type={'file'}
            ref={bulkUploadInputRef}
            accept={'video/*'}
            multiple
            className={'hidden'}
            id={'bulk-media-upload'}
            onChange={handleMediaBulkUpload}
          />
          <Button
            as={'label'}
            htmlFor={'bulk-media-upload'}
            variant={'outline'}
            className={'border-none shadow-sm cursor-pointer'}
            onClick={handleOpenBulkUpload}
          >
            <Upload className="mr-2 w-4 h-5" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleNewLecture}
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          className="cursor-pointer"
        >
          Add Lecture
        </Button>
        {mediaUploadProgress ? (
          <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div
              className="border-2 border-gray-400 p-5 rounded-md"
              key={index}
            >
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96 focus-visible:border-1 focus-visible:ring-0"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={courseCurriculumFormData[index]?.freePreview}
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    id={`freePreview-${index + 1}`}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex items-center gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="450px"
                      height="200px"
                    />
                    <Button
                      onClick={() => handleReplaceVideo(index)}
                      className={'cursor-pointer'}
                    >
                      Replace Video
                    </Button>
                    <Button className="bg-red-800">Delete Video</Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="mb-4"
                    onChange={(event) =>
                      handleSingleLectureUpload(event, index)
                    }
                  />
                )}
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
