/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 24 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import bcrypt from 'bcryptjs';
import createError from 'http-errors';

// Internal imports
import prisma from '../../prisma/index.js';
import { successResponse } from '../responseController.js';

// Register Controller
const registerUser = async (req, res, next) => {
  const { userName, userEmail, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail,
        userName,
      },
    });

    if (existingUser) {
      return next(
        createError(
          409,
          'This email or user name already exists. Please login.',
        ),
      );
    }

    // Hash password
    const hassedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        userName,
        userEmail,
        password: hassedPassword,
        role,
      },
    });

    // Send response
    return successResponse(res, {
      statusCode: 201,
      message: 'User created successfully',
      //   payload: user,
    });
  } catch (error) {
    next(error);
  }
};

// Exports
export { registerUser };
