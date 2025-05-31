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
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/instructor/course', instructorCourseRouter);

// Client Error Handler
app.use(clientError)

// Server Error Handler
app.use(serverError)

// Export
export default app;
