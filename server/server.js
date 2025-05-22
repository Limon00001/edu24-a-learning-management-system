/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import dotenv from 'dotenv';

// Internal imports
import app from './app.js';
import dbConnection from './config/db.js';

// Environment variables configuration
dotenv.config();

// Port configuration
const PORT = process.env.PORT || 5001;

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  dbConnection();
});
