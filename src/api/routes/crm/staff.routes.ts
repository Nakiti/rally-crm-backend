import { Router } from 'express';
import {
  getStaffForOrganization,
  inviteStaffMember,
  updateStaffRole,
  removeStaffFromOrganization
} from '../../controllers/crm/staff.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import {
  inviteStaffSchema,
  updateStaffRoleSchema,
  removeStaffSchema
} from './staff.schemas.js';

const router = Router();

// All routes require authentication
router.use(isStaffAuthenticated);

/**
 * @route   GET /api/crm/staff
 * @desc    Get all staff members for the authenticated user's organization
 * @access  Private (Staff)
 */
router.get('/', getStaffForOrganization);

/**
 * @route   POST /api/crm/staff/invite
 * @desc    Invite a new staff member to the organization
 * @access  Private (Admin only)
 */
router.post('/invite', validate(inviteStaffSchema), hasRole(['admin']), inviteStaffMember);

/**
 * @route   PATCH /api/crm/staff/:staffAccountId
 * @desc    Update a staff member's role within the organization
 * @access  Private (Admin only)
 */
router.patch('/:staffAccountId', validate(updateStaffRoleSchema), hasRole(['admin']), updateStaffRole);

/**
 * @route   DELETE /api/crm/staff/:staffAccountId
 * @desc    Remove a staff member from the organization
 * @access  Private (Admin only)
 */
router.delete('/:staffAccountId', validate(removeStaffSchema), hasRole(['admin']), removeStaffFromOrganization);

export default router;
