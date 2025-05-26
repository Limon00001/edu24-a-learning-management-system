/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';
import multer from 'multer';

// Internal Imports
import {
  deleteMediaFromCloudinaryController,
  uploadMediaToCloudinaryController,
} from '../../controllers/instructor-controllers/media-controllers.js';

// Router Instance
const router = express.Router();

// Upload file
const upload = multer({ dest: 'uploads/' });

// Routes
router.post(
  '/upload',
  upload.single('file'),
  uploadMediaToCloudinaryController,
);
router.delete('/delete/:id', deleteMediaFromCloudinaryController);

// Export
export default router;
