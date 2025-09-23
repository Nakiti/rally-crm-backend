import { Router } from 'express';
import {
  getDonations,
  getDonationDetails,
  getRecentDonations
} from '../../controllers/crm/donation.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import {
  getDonationsSchema,
  getDonationDetailsSchema,
  getRecentDonationsSchema
} from './donation.schemas.js';

const router = Router();

/**
 * @route   GET /api/crm/donations
 * @desc    Get all donations for the organization with optional filtering and pagination
 * @access  Private (Admin, Editor)
 */
router.get('/', 
  isStaffAuthenticated, 
  hasRole(['admin', 'editor']), 
  validate(getDonationsSchema), 
  getDonations
);

/**
 * @route   GET /api/crm/donations/recent
 * @desc    Get recent donations for the organization
 * @access  Private (Admin, Editor)
 */
router.get('/recent', 
  isStaffAuthenticated, 
  hasRole(['admin', 'editor']), 
  validate(getRecentDonationsSchema), 
  getRecentDonations
);

/**
 * @route   GET /api/crm/donations/:id
 * @desc    Get detailed information about a specific donation
 * @access  Private (Admin, Editor)
 */
router.get('/:id', 
  isStaffAuthenticated, 
  hasRole(['admin', 'editor']), 
  validate(getDonationDetailsSchema), 
  getDonationDetails
);

export default router;

