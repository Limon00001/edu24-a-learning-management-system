/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 02 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { ArrowUpDownIcon, Verified } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Internal Imports
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { filterOptions, sortOptions } from '@/config';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseListService } from '@/services';

// Component
const StudentViewCoursesPage = () => {
  const [sort, setSort] = useState('price-lowtohigh');
  const [filters, setFilters] = useState({});
  const {
    studentViewCoursesLists,
    studentViewCourseDetails,
    setStudentViewCoursesLists,
    loadingState,
    setLoadingState,
    studentBoughtCoursesList,
  } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isCoursePurchased = (courseId) => {
    return studentBoughtCoursesList?.some(
      (course) =>
        course.courseId === courseId && course.paymentStatus === 'completed',
    );
  };

  useEffect(() => {
    const fetchAllStudentViewCourses = async (filters, sort) => {
      try {
        const query = new URLSearchParams({
          ...(Object.keys(filters).length > 0 ? filters : {}),
          sortBy: sort,
        }).toString();

        const { data } = await fetchStudentViewCourseListService(query);

        if (data?.success) {
          setStudentViewCoursesLists(data?.payload);
          setLoadingState(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchAllStudentViewCourses(filters, sort);
  }, [setStudentViewCoursesLists, filters, sort, setLoadingState]);

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters, setSearchParams]);

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join('&');
  };

  const handleFilterOnChange = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(
        getCurrentOption.id,
      );

      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption.id);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    localStorage.setItem('filters', JSON.stringify(copyFilters));
  };

  const handleCourseClick = (courseItem) => {
    if (!auth?.user) {
      navigate('/auth');
      return;
    }

    if (isCoursePurchased(courseItem.id)) {
      navigate(`/course-progress/${courseItem.id}`);
    } else {
      navigate(`/course/details/${courseItem.id}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="space-y-4">
            {Object.keys(filterOptions).map((keyItem) => (
              <div key={keyItem} className="p-4 space-y-4">
                <h2 className="font-semibold text-lg mb-4">
                  {keyItem.toUpperCase()}
                </h2>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex items-center gap-3 font-medium"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                        className="cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 py-2 px-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="text-sm">Sort by</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[180px] border-none"
              >
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className={'cursor-pointer'}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm font-medium">
              {studentViewCoursesLists?.length} results
            </span>
          </div>
          <div className="space-y-4">
            {studentViewCoursesLists && studentViewCoursesLists.length > 0 ? (
              studentViewCoursesLists.map((courseItem) => (
                <Card
                  key={courseItem.id}
                  onClick={() => handleCourseClick(courseItem)}
                  className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="flex p-4 gap-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem.image}
                        alt={courseItem.title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem.title}
                      </CardTitle>
                      <p className="text-lg text-black/60 font-medium mb-1">
                        {courseItem.instructorName}
                      </p>
                      <p className="text-sm text-gray-800 mt-3 mb-3">
                        {`${courseItem?.curriculum?.length} ${
                          courseItem?.curriculum?.length > 1
                            ? 'Lessons'
                            : 'Lesson'
                        } - ${courseItem?.level} Level`}
                      </p>
                      <div className="flex items-center gap-2">
                        {!isCoursePurchased(courseItem.id) ? (
                          <p className="text-lg font-bold">
                            ${courseItem?.pricing}
                          </p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Verified className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-600">
                              Enrolled
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : loadingState ? (
              <Skeleton />
            ) : (
              <h1 className="text-md text-gray-700">No courses found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Export
export default StudentViewCoursesPage;
