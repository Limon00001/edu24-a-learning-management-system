/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 06 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Test controller
const testController = (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'Test route' });
  } catch (error) {
    console.error(error);
  }
};

// Export
export default testController;
