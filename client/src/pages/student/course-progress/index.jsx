/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 05 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import Cookies from 'js-cookie';
import { BarChart2, Book, CheckCircle, Clock, Play, Video } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Internal Imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseDetailsService } from '@/services';
import checkCoursePurchase from '../check-purchase';

const StudentViewCourseProgressPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoPlayerRef = useRef(null);
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList } = useContext(StudentContext);
  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeLectureIndex, setActiveLectureIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load progress from cookie on mount
  useEffect(() => {
    if (id && auth?.user?.id) {
      const savedProgress = Cookies.get(
        `course-progress-${auth.user.id}-${id}`,
      );
      if (savedProgress) {
        const { lectureIndex } = JSON.parse(savedProgress);
        setActiveLectureIndex(lectureIndex);
      }
    }
  }, [id, auth?.user?.id]);

  // Save progress to cookie whenever active lecture changes
  useEffect(() => {
    if (id && auth?.user?.id && courseData) {
      Cookies.set(
        `course-progress-${auth.user.id}-${id}`,
        JSON.stringify({
          lectureIndex: activeLectureIndex,
          totalLectures: courseData.curriculum.length,
          lastUpdated: new Date().toISOString(),
        }),
        { expires: 365 }, // Cookie expires in 1 year
      );
    }
  }, [activeLectureIndex, id, auth?.user?.id, courseData]);

  useEffect(() => {
    const verifyAndFetchCourse = async () => {
      try {
        setLoading(true);

        // Verify purchase
        const isPurchased = checkCoursePurchase(
          auth?.user?.id,
          id,
          studentBoughtCoursesList,
        );

        if (!isPurchased) {
          navigate(`/course/details/${id}`);
          return;
        }

        // Fetch course details
        const { data } = await fetchStudentViewCourseDetailsService(
          id,
          auth?.user?.id,
        );

        if (data?.success) {
          setCourseData(data?.payload);
          // Set first video as default
          setCurrentVideo(data?.payload.curriculum[0]?.videoUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user?.id && id) {
      verifyAndFetchCourse();
    }
  }, [id, auth?.user?.id, studentBoughtCoursesList, navigate]);

  const handleLectureClick = (video, index) => {
    setCurrentVideo(video);
    setActiveLectureIndex(index);

    // Smooth scroll to video player
    videoPlayerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Calculate progress percentage based on completed lectures
  const calculateProgress = () => {
    if (!courseData?.curriculum?.length) return 0;

    const completedLectures = activeLectureIndex + 1;
    return Math.round((completedLectures / courseData.curriculum.length) * 100);
  };

  // If loading, show a spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {courseData?.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <span>{courseData?.curriculum?.length} Lectures</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              <span>{courseData?.level} Level</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Progress: {calculateProgress()}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-none" ref={videoPlayerRef}>
              <div className="aspect-video px-4">
                {currentVideo ? (
                  <VideoPlayer
                    url={currentVideo}
                    poster={courseData?.image}
                    key={currentVideo}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">
                      Select a lecture to start learning
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {courseData?.curriculum[activeLectureIndex]?.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Lecture {activeLectureIndex + 1} of{' '}
                  {courseData?.curriculum?.length}
                </p>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {courseData?.curriculum[activeLectureIndex]?.description ||
                    courseData?.description}
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar - Course Curriculum */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 overflow-hidden border-none shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  Course Content
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {courseData?.curriculum?.length} lessons
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {courseData?.curriculum?.map((lecture, index) => (
                  <Button
                    key={lecture.id}
                    variant="ghost"
                    className={`w-full h-auto p-4 flex items-start gap-3 text-left hover:bg-gray-50 rounded-none cursor-pointer transition-colors ${
                      index === activeLectureIndex
                        ? 'bg-gray-200 hover:bg-gray-200/80'
                        : ''
                    }`}
                    onClick={() => handleLectureClick(lecture.videoUrl, index)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="mt-1.5 flex-shrink-0">
                        {index === activeLectureIndex ? (
                          <Play className="h-4 w-4 text-blue-600" />
                        ) : index < activeLectureIndex ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Video className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <div className="flex flex-col w-full min-w-0">
                        <span className="text-sm font-medium text-gray-900">
                          Lecture {index + 1}
                        </span>
                        <span className="text-sm text-gray-600 truncate">
                          {lecture.title}
                        </span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default StudentViewCourseProgressPage;
