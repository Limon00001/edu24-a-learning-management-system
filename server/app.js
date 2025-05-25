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
import { securityMiddleware } from './middlewares/security/index.js';
import authRouter from './routes/auth-routes/index.js';

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
app.use(securityMiddleware);

// Routes
app.use('/auth', authRouter);

// Export
export default app;
