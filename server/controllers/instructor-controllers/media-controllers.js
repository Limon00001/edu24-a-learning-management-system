/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import createError from 'http-errors';

// Internal Imports
import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from '../../helpers/cloudinary.js';
import { successResponse } from '../responseController.js';

const uploadMediaToCloudinaryController = async (req, res, next) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'File uploaded successfully',
      payload: {
        data: result,
      },
    });
  } catch (error) {
    return next(createError(500, 'Error uploading media'));
  }
};

const bulkUploadedCourse = async (req, res, next) => {
  try {
    const uploadPromises = req.files.map(async (file) =>
      uploadMediaToCloudinary(file.path),
    );
    const results = await Promise.all(uploadPromises);

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'Files uploaded successfully',
      payload: {
        data: results,
      },
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, `Error uploading files ${error.message}`));
  }
};

const deleteMediaFromCloudinaryController = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(createError(400, 'Asset Id is required.'));

  try {
    await deleteMediaFromCloudinary(id);

    // Response
    successResponse(res, {
      statusCode: 200,
      message: 'File uploaded successfully',
      payload: {},
    });
  } catch (error) {
    return next(createError(500, 'Error deleting media'));
  }
};

// Export
export {
  bulkUploadedCourse,
  deleteMediaFromCloudinaryController,
  uploadMediaToCloudinaryController,
};
