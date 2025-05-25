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
import createToken from '../../helpers/token/index.js';
import prisma from '../../prisma/index.js';
import { successResponse } from '../responseController.js';

// Register Controller
const registerUser = async (req, res, next) => {
  const { userName, userEmail, password, role } = req.body;

  try {
    // Check if user already exists
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

// Login Controller
const loginUser = async (req, res, next) => {
  const { userEmail, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail,
      },
    });

    if (!existingUser) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate token
    const token = createToken(
      {
        id: existingUser._id,
        userName: existingUser.userName,
        userEmail: existingUser.userEmail,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN,
    );

    // Send response
    return successResponse(res, {
      statusCode: 200,
      message: 'Login successful',
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  const user = req.user;

  try {
    if (!user) {
      return next(createError(401, 'Unauthorized'));
    }

    // Send response
    return successResponse(res, {
      statusCode: 200,
      message: 'Login successful',
      payload: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Exports
export { checkAuth, loginUser, registerUser };
