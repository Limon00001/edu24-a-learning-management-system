/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 03 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import createError from 'http-errors';
import Stripe from 'stripe';

// Internal Imports
import prisma from '../../prisma/index.js';
import { successResponse } from '../responseController.js';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//  Verify Payment Function
export const verifyPayment = async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return next(createError(400, 'Session ID is required'));
    }

    // Use a transaction to prevent race conditions
    const result = await prisma.$transaction(async (tx) => {
      // Check for existing payment first
      const existingPayment = await tx.student.findUnique({
        where: {
          paymentId: sessionId,
        },
      });

      if (existingPayment) {
        return {
          statusCode: 200,
          message: 'Payment already processed',
          payload: {
            enrolled: true,
            enrollment: existingPayment,
          },
        };
      }

      // Retrieve stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== 'paid') {
        throw new Error('Payment not completed');
      }

      // Get user details
      const user = await tx.user.findUnique({
        where: { id: session.metadata.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Get course details
      const course = await tx.course.findUnique({
        where: { id: session.metadata.courseId },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      try {
        // Attempt to create enrollment with unique constraints
        const enrollment = await tx.student.create({
          data: {
            studentId: session.metadata.userId,
            studentName: user.userName,
            studentEmail: user.userEmail,
            courseId: course.id,
            courseTitle: course.title,
            coursePricing: course.pricing,
            courseImage: course.image,
            courseDescription: course.description,
            courseInstructor: course.instructorName,
            courseInstructorId: course.instructorId,
            courseLevel: course.level,
            courseLanguage: course.primaryLanguage,
            paymentStatus: 'completed',
            paymentId: sessionId,
          },
        });

        return {
          statusCode: 200,
          message: 'Payment verified successfully',
          payload: {
            enrolled: true,
            enrollment,
          },
        };
      } catch (error) {
        if (error.code === 'P2002') {
          // Handle unique constraint violation
          const existingEnrollment = await tx.student.findFirst({
            where: {
              studentId: session.metadata.userId,
              courseId: session.metadata.courseId,
            },
          });
          return {
            statusCode: 200,
            message: 'Already enrolled in this course',
            payload: {
              enrolled: true,
              enrollment: existingEnrollment,
            },
          };
        }
        throw error;
      }
    });

    return successResponse(res, result);
  } catch (error) {
    console.error('Payment verification error:', error);
    return next(createError(500, error.message));
  }
};

// Create Checkout Session
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    // Check if course exists
    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    // Stripe checkout session creation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.coverImage],
            },
            unit_amount: course.pricing * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/course/details/${courseId}`,
      metadata: {
        courseId,
        userId,
      },
    });

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Checkout session created successfully',
      payload: { url: session.url },
    });
  } catch (error) {
    console.error('Create checkout session error:', error);
    next(createError(500, error.message));
  }
};
