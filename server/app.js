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
import prisma from './prisma/index.js';

// Express app instance
const app = express();

// Middleware configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.post('/', async (req, res) => {
  const { name, email } = req.body;

  console.log(name, email);

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const users = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.status(200).json({
    success: true,
    data: users,
    message: 'Data received successfully',
  });
});

// Export
export default app;
