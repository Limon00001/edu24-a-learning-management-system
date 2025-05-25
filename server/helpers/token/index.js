/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import jwt from 'jsonwebtoken';

// Create a token
const createToken = (payload, secretKey, expiresIn = '20m') => {
  if (!payload || typeof payload !== 'object')
    return throw new Error('Payload must be an object and cannot be empty.');

  if (typeof secretKey !== 'string' || secretKey === '')
    return throw new Error('Secret key must be a string and cannot be empty.');

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    throw error;
  }
};

// Verify token
const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw error;
  }
};

// Export
export { verifyToken, createToken };
