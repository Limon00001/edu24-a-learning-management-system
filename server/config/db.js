/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 29 Apr, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal imports
import prisma from '../prisma/index.js';

// Database connection
const dbConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

// Export
export default dbConnection;
