import { Router } from 'express';
import { getCurrentUser } from '../../controllers/crm/staff.controller.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';

const router = Router();

// All routes require authentication
router.use(isStaffAuthenticated);

/**
 * @route   GET /api/crm/me
 * @desc    Get current authenticated user information
 * @access  Private (Staff)
 */
router.get('/me', getCurrentUser);

export default router;
