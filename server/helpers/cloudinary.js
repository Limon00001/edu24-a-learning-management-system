/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Import
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    throw new Error(`Error uploading file to clodinary ${error}`);
  }
};

const deleteMediaFromCloudinary = async (publicId) => {
  if (!publicId) {
    console.log('No public_id provided for deletion');
    return null;
  }

  try {
    // Try to delete as video first
    try {
      const videoResult = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'video',
      });
      if (videoResult.result === 'ok') {
        return videoResult;
      }
    } catch (err) {
      if (!err.message.includes('resource_type')) {
        throw err;
      }
      console.log('Not a video, trying as image...');
    }

    // Then try as image with invalidation
    const imageResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    if (imageResult.result === 'ok') {
      console.log('Successfully deleted image:', publicId);
    }

    return imageResult;
  } catch (error) {
    throw new Error(`Failed deleting file from clodinary ${error}`);
  }
};

// Export
export { deleteMediaFromCloudinary, uploadMediaToCloudinary };
