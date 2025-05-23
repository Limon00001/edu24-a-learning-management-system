/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Internal Imports
import CommonForm from '@/components/common-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signInFormControls, signUpFormControls } from '@/config';

// Component
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin');

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <header className="flex flex-col min-h-screen">
      <nav className="flex items-center px-4 lg:px-6 h-14 border-b">
        <Link to={'/'} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="text-xl font-extrabold uppercase">Edu&apos;24</span>
        </Link>
      </nav>
      <div className="flex items-center justify-center w-screen m-auto bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="cursor-pointer">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4 border-transparent shadow-md">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-sm">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  buttonText="Sign In"
                  formControls={signInFormControls}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4 border-transparent shadow-md">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">
                  Create Account
                </CardTitle>
                <CardDescription className="text-sm">
                  Join us by creating your account today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  buttonText="Sign Up"
                  formControls={signUpFormControls}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </header>
  );
};

// Export
export default AuthPage;
