/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { createContext, useEffect, useState } from 'react';

// Internal Imports
import { signInFormControls, signUpFormControls } from '@/config';
import { checkAuthService, loginService, registerService } from '@/services';

// Create Auth Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(signInFormControls);
  const [signUpFormData, setSignUpFormData] = useState(signUpFormControls);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    const DATA = await registerService(signUpFormData);
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginService(signInFormData);

      if (data?.success) {
        localStorage.setItem('accessToken', data?.payload?.accessToken);
        setAuth({
          authenticate: true,
          user: data?.payload?.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  };

  const checkAuthUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setAuth({ authenticate: false, user: null });
      return;
    }

    try {
      const { data } = await checkAuthService();

      if (data?.success) {
        setAuth({
          authenticate: true,
          user: data?.payload?.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      localStorage.removeItem('accessToken');
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const value = {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export
export { AuthContext, AuthProvider };
