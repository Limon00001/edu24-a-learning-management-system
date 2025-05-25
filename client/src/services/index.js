/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 24 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal imports
import axiosInstance from '@/api/axiosInstance';

// Services
const registerService = async (formData) => {
  const { data } = await axiosInstance.post('/auth/register', formData);

  return data;
};

const loginService = async (formData) => {
  const { data } = await axiosInstance.post('/auth/login', formData);

  return data;
};

const checkAuthService = async () => {
  const { data } = await axiosInstance.get('/auth/check-auth');

  return data;
};

// Exports
export { checkAuthService, loginService, registerService };
