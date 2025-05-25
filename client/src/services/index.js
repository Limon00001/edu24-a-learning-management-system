/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 24 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

import axiosInstance from '@/api/axiosInstance';

const registerService = async (formData) => {
  const { data } = await axiosInstance.post('/auth/register', {
    ...formData,
  });

  return data;
};

export { registerService };
