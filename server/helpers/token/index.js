/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import jwt from 'jsonwebtoken';

// Token creation
const createToken = (payload, secretKey, expiresIn = '20m') => {
  // Validate payload
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be an object and cannot be empty.');
  }

  // Validate secret key
  if (typeof secretKey !== 'string' || secretKey === '') {
    throw new Error('Secret key must be a string and cannot be empty.');
  }

  try {
    return jwt.sign(payload, secretKey, { expiresIn });
  } catch (error) {
    throw new Error(`Token creation failed: ${error.message}`);
  }
};

// Export
export default createToken;
