/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { BarChart, Book, LogOut, User } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Internal Imports
import InstructorCourses from '@/components/instructor-view/courses';
import InstructorDashboard from '@/components/instructor-view/dashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AuthContext } from '@/context/auth-context';
import { InstructorContext } from '@/context/instructor-context';
import { fetchInstructorCourseListService } from '@/services';

// Component
const InstructorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { resetCredentials, auth } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const { data } = await fetchInstructorCourseListService();

        if (data?.success) {
          setInstructorCoursesList(data?.payload?.data);
        }
      } catch (error) {
        console.error(`Error fetching all courses ${error}`);
      }
    };

    fetchAllCourses();
  }, [setInstructorCoursesList]);

  const menuItems = [
    {
      id: crypto.randomUUID(),
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <InstructorDashboard />,
    },
    {
      id: crypto.randomUUID(),
      icon: Book,
      label: 'Courses',
      value: 'courses',
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      id: crypto.randomUUID(),
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null,
    },
  ];

  // Handle logout functionality
  const handleLogout = () => {
    try {
      resetCredentials();
      localStorage.clear();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed', {
        description: 'An error occurred while logging out.',
      });
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <div className="mb-8 text-center">
            <div className="w-18 h-18 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900">
              {auth?.user?.userName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{auth?.user?.email}</p>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full mt-2">
              Instructor
            </span>
          </div>
          <div className="border-t mb-4"></div>

          <nav>
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.id}
                variant={activeTab === menuItem.value ? 'default' : 'ghost'}
                className="w-full justify-start mb-2 cursor-pointer"
                onClick={
                  menuItem.value === 'logout'
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.id}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Export
export default InstructorDashboardPage;
