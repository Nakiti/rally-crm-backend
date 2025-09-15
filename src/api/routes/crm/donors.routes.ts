import { Router } from 'express';
import { getDonors, getDonor } from '../../controllers/crm/donor.controller.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';

const router = Router();

// All routes require authentication
router.use(isStaffAuthenticated);

/**
 * @route   GET /api/crm/donors
 * @desc    Get all donors for the organization with optional filtering and pagination
 * @access  Private (Admin, Editor)
 */
router.get('/', hasRole(['admin', 'editor']), getDonors);

/**
 * @route   GET /api/crm/donors/:id
 * @desc    Get a single donor profile by ID with their complete donation history
 * @access  Private (Admin, Editor)
 */
router.get('/:id', hasRole(['admin', 'editor']), getDonor);

export default router;
