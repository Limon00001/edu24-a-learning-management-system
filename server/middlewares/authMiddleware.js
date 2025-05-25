/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 25 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import createError from 'http-errors';

// Internal imports
import verifyToken from '../helpers/token/verifyToken.js';

// Authentication Middleware
const authenticate = (req, res, next) => {
  // Get token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError(401, 'Authentication failed'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(createError(401, 'Authentication failed'));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    return next(createError(401, 'Authentication failed'));
  }
};

// Export
export default authenticate;
