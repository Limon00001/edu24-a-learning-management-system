/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 02 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import {
  BookOpen,
  Calendar,
  CheckCircle,
  DollarSign,
  GraduationCap,
  Lock,
  Play,
  Users,
  Verified,
  Video,
} from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Internal Imports
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import VideoPlayer from '@/components/video-player';
import VideoThumbnail from '@/components/video-player/video-thumbnail';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import {
  createPaymentSession,
  fetchStudentViewCourseDetailsService,
} from '@/services';

// Component
const StudentViewCourseDetailsPage = () => {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    loadingState,
    setLoadingState,
    studentBoughtCoursesList,
  } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const [currentLectureNumber, setCurrentLectureNumber] = useState(1);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isCoursePurchased, setIsCoursePurchased] = useState(null);
  const params = useParams();
  const videoPointerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoadingState(true);

        // checking if the student has a completed payment for the course
        const isEnrolled = studentBoughtCoursesList?.some(
          (course) =>
            course.courseId === params.id &&
            course.paymentStatus === 'completed',
        );

        // If enrolled, redirect to progress page
        if (isEnrolled) {
          navigate(`/course-progress/${params.id}`);
          return;
        }

        // Fetch course details
        const { data } = await fetchStudentViewCourseDetailsService(
          params.id,
          auth?.user?.id || '',
        );

        if (data?.success) {
          setStudentViewCourseDetails(data?.payload);
          const firstFreeVideo = data?.payload.curriculum.find(
            (lecture) => lecture.freePreview,
          )?.videoUrl;
          // setCurrentVideo(data?.payload?.curriculum[0]?.videoUrl);
          setCurrentVideo(firstFreeVideo || null);
          setIsCoursePurchased(data?.payload);
        } else {
          setStudentViewCourseDetails(null);
          setCurrentVideo(null);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        setStudentViewCourseDetails(null);
        setCurrentVideo(null);
      } finally {
        setLoadingState(false);
      }
    };

    if (params.id) {
      fetchCourseDetails();
    }

    return () => {
      // Cleanup on unmount
      setStudentViewCourseDetails(null);
      setCurrentVideo(null);
    };
  }, [
    params.id,
    auth?.user?.id,
    studentBoughtCoursesList,
    setStudentViewCourseDetails,
    setLoadingState,
    navigate,
  ]);

  useEffect(() => {
    // Reset video and lecture number when course details change
    if (studentViewCourseDetails?.curriculum?.length > 0) {
      setCurrentLectureNumber(1);
      setCurrentVideo(studentViewCourseDetails.curriculum[0].videoUrl);
    }
  }, [studentViewCourseDetails]);

  const handleLectureClick = (lecture) => {
    // Check if the lecture is free preview or if the user is enrolled
    if (lecture.freePreview || studentViewCourseDetails?.isEnrolled) {
      setCurrentVideo(lecture.videoUrl);

      // Scroll to video player
      videoPointerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleEnrollNow = async () => {
    try {
      setLoadingState(true);

      // Check if the course is already purchased
      const { data } = await createPaymentSession({
        courseId: studentViewCourseDetails?.id,
        courseTitle: studentViewCourseDetails?.title,
        coursePricing: studentViewCourseDetails?.pricing,
      });

      // Redirect to Stripe Checkout
      if (data?.success) {
        toast.success('Redirecting to payment...', {
          duration: 2000,
        });
        window.location.href = data.payload.url;
      }
    } catch (error) {
      console.error('Error creating payment session:', error);
      toast.error('Payment failed. Please try again later.');
      setLoadingState(false);
      return;
    }
  };

  // Render loading state
  if (loadingState) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-pulse">
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  // Render course details if available
  if (!studentViewCourseDetails) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
        <Button onClick={() => navigate('/courses')} className="mt-4">
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl" />
          <div className="relative z-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-black/90 font-medium rounded-full shadow-sm"
            >
              {studentViewCourseDetails?.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text">
              {studentViewCourseDetails?.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 max-w-3xl">
              {studentViewCourseDetails?.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  Instructor: {studentViewCourseDetails?.instructorName}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                {studentViewCourseDetails?.isEnrolled ? (
                  <>
                    <Verified className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Enrolled</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-medium">
                      ${studentViewCourseDetails?.pricing}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="font-medium">
                  {studentViewCourseDetails?.level} Level
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">
                  {studentViewCourseDetails?.students?.length || 0} Students
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="font-medium">
                  {new Date(
                    studentViewCourseDetails?.createdAt,
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            <Card className="p-8 bg-white border-blue-100/50 shadow-lg">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="h-5 w-1 bg-blue-600 rounded-full" />
                  Course Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {studentViewCourseDetails?.description}
                </p>
              </div>
            </Card>
            {/* Course Content */}
            <Card className="p-8 bg-white border-blue-100/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-blue-600 rounded-full" />
                About This Course
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentViewCourseDetails?.objectives
                  .split(',')
                  .map((objective, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50/30 to-blue-50/50 hover:from-blue-100/50 hover:to-blue-50/80 transition-all duration-200 border border-blue-100/30 hover:border-blue-200/50 shadow-sm hover:shadow-md"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0 group-hover:text-blue-700" />
                      <p className="text-gray-700 group-hover:text-gray-900">
                        {objective.trim()}
                      </p>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Video Player & Curriculum */}
            <Card className="p-8 bg-white border-blue-100/50 shadow-lg">
              <div ref={videoPointerRef} className="mb-8">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-lg">
                  {currentVideo ? (
                    <VideoPlayer
                      className="w-full h-full object-cover"
                      poster={studentViewCourseDetails?.image}
                      url={currentVideo}
                      title={
                        studentViewCourseDetails?.curriculum.find(
                          (lecture) => lecture.videoUrl === currentVideo,
                        )?.title || 'Course Preview'
                      }
                    />
                  ) : (
                    <VideoThumbnail
                      imageUrl={studentViewCourseDetails?.image}
                      title={
                        studentViewCourseDetails?.curriculum[0]?.title ||
                        'Select a lecture to play'
                      }
                      lectureNumber={
                        studentViewCourseDetails?.curriculum[0] ? 1 : null
                      }
                    />
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
                  <Video className="w-6 h-6 text-blue-600" />
                  Course Content
                </h2>

                <div className="space-y-4">
                  {studentViewCourseDetails?.curriculum?.map(
                    (lecture, index) => (
                      <button
                        key={lecture.id}
                        onClick={() => handleLectureClick(lecture)}
                        className="w-full group p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white hover:bg-blue-50/50 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={!lecture.freePreview}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {lecture.freePreview ? (
                              <Play className="w-6 h-6 text-blue-600" />
                            ) : (
                              <Lock className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-grow text-left">
                            <h3 className="font-medium text-gray-900">
                              {index + 1}. {lecture.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                              <Video className="w-4 h-4" />
                              Video Lecture
                            </p>
                          </div>
                          {lecture.freePreview && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                            >
                              Free Preview
                            </Badge>
                          )}
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Welcome Message
                </h3>
                <p className="text-gray-600">
                  {studentViewCourseDetails?.welcomeMessage}
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          {!studentViewCourseDetails?.isEnrolled && (
            <div className="lg:col-span-1">
              <Card className="sticky top-4 p-8 bg-white border-blue-100/50 shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl" />
                  <div className="relative z-10 space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100/50">
                      <h3 className="text-4xl font-bold text-gray-800 mb-2">
                        ${studentViewCourseDetails?.pricing}
                      </h3>
                      <p className="text-gray-600">Lifetime Access</p>
                    </div>

                    <Button
                      onClick={handleEnrollNow}
                      className="w-full text-lg py-6 font-semibold rounded-xl shadow-lg cursor-pointer transition-all duration-300"
                    >
                      {loadingState ? (
                        <span className="flex items-center justify-center gap-2">
                          Enrolling...
                        </span>
                      ) : (
                        'Enroll Now'
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <p>30-Day Money-Back Guarantee</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentViewCourseDetailsPage;
