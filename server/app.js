/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import cors from 'cors';
import express from 'express';

// Internal Imports
import { clientError, serverError } from './middlewares/errorsMiddleware.js';
import authRouter from './routes/auth-routes/index.js';
import instructorCourseRouter from './routes/instructor-routes/course-routes.js';
import mediaRouter from './routes/instructor-routes/media-routes.js';
import courseProgressRouter from './routes/student-routes/course-progress-routes.js';
import studentCourseRouter from './routes/student-routes/course-routes.js';
import paymentRouter from './routes/student-routes/payment-routes.js';
import studentCoursesRouter from './routes/student-routes/student-courses-routes.js';
import testRouter from './routes/test-routes/index.js';

// Express app instance
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
// app.use(securityMiddleware);

// Routes
app.use('/', testRouter);
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/instructor/course', instructorCourseRouter);
app.use('/student/course', studentCourseRouter);
app.use('/payment', paymentRouter);
app.use('/student/courses-bought', studentCoursesRouter);
app.use('/student/course-progress', courseProgressRouter);

// Client Error Handler
app.use(clientError);

// Server Error Handler
app.use(serverError);

// Export
export default app;
