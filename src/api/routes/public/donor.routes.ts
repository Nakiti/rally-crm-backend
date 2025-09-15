import { Router } from 'express';
import { getDonationHistory } from '../../controllers/public/donor.controller.js';
import { isDonorAuthenticated } from '../../middleware/isDonorAuthenticated.js';

const router = Router();

/**
 * @route   GET /api/public/donor/history
 * @desc    Get donation history for the authenticated donor
 * @access  Protected (Donor Authentication Required)
 */
router.get('/history', isDonorAuthenticated, getDonationHistory);

export default router;

