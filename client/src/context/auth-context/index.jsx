/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { createContext, useState } from 'react';

// Internal Imports
import { signInFormControls, signUpFormControls } from '@/config';
import { registerService } from '@/services';

// Create Auth Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(signInFormControls);
  const [signUpFormData, setSignUpFormData] = useState(signUpFormControls);

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  };

  const value = {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export
export { AuthContext, AuthProvider };
