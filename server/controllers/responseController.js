/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Error Handling
const errorResponse = (
  res,
  { statusCode = 500, message = 'Internal Server Error' },
) => {
  return res.status(statusCode).json({
    error: {
      success: false,
      message: message,
    },
  });
};

// Success Handling
const successResponse = (
  res,
  { statusCode = 200, message = 'Success', payload = {} },
) => {
  return res.status(statusCode).json({
    data: {
      success: true,
      message: message,
      payload,
    },
  });
};

// Export
export { errorResponse, successResponse };
