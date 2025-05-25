/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import jwt from 'jsonwebtoken';

const verifyToken = (token, secretKey) => {
  // Validate token
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a string and cannot be empty.');
  }

  // Validate secret key
  if (typeof secretKey !== 'string' || secretKey === '') {
    throw new Error('Secret key must be a string and cannot be empty.');
  }

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

// Export
export default verifyToken;
