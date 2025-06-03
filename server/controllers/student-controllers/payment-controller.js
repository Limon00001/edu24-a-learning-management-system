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

    // Check if sessionId is provided
    if (!sessionId) {
      return next(createError(400, 'Session ID is required'));
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // user details
      const user = await prisma.user.findUnique({
        where: { id: session.metadata.userId },
      });

      // Check if user exists
      if (!user) {
        return next(createError(404, 'User not found'));
      }

      // Get course details
      const course = await prisma.course.findUnique({
        where: { id: session.metadata.courseId },
      });

      // Check if course exists
      if (!course) {
        return next(createError(404, 'Course not found'));
      }

      // Create enrollment record with all required fields including courseLanguage
      const enrollment = await prisma.student.create({
        data: {
          studentId: session.metadata.userId,
          studentName: user.userName,
          studentEmail: user.userEmail,
          courseId: course.id,
          courseTitle: course.title,
          coursePricing: course.pricing,
          courseImage: course.coverImage || '',
          courseDescription: course.description,
          courseInstructor: course.instructorName,
          courseInstructorId: course.instructorId,
          courseLevel: course.level,
          courseLanguage: course.language || 'english',
          paymentStatus: 'completed',
          paymentId: session.id,
        },
      });

      // Respond with success message
      return successResponse(res, {
        statusCode: 200,
        message: 'Payment verified successfully',
        payload: {
          enrolled: true,
          enrollment,
        },
      });
    } else {
      return next(createError(400, 'Payment not completed'));
    }
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
