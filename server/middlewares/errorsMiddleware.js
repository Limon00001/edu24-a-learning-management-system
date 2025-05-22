/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import createHttpError from 'http-errors';

// Internal Imports
import { errorResponse } from '../controllers/responseController';

// Client Error
const clientError = (req, res, next) => {
  next(createHttpError(404, 'Sorry, We could not found your request.'));
};

// Server Error
const serverError = (err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
};

// exports
export { clientError, serverError };
