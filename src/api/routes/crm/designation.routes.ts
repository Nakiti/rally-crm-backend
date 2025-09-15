import { Router } from 'express';
import {
  createDesignation,
  getAllDesignations,
  updateDesignation,
  archiveDesignation
} from '../../controllers/crm/designation.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import {
  createDesignationSchema,
  updateDesignationSchema,
  archiveDesignationSchema
} from './designation.schemas.js';

const router = Router();

/**
 * @route   POST /api/crm/designations
 * @desc    Create a new designation
 * @access  Private (Admin/Editor)
 */
router.post('/', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(createDesignationSchema), createDesignation);

/**
 * @route   GET /api/crm/designations
 * @desc    Get all designations for the organization
 * @access  Private (Admin/Editor)
 */
router.get('/', isStaffAuthenticated, hasRole(['admin', 'editor']), getAllDesignations);

/**
 * @route   PUT /api/crm/designations/:id
 * @desc    Update a designation
 * @access  Private (Admin/Editor)
 */
router.put('/:id', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(updateDesignationSchema), updateDesignation);

/**
 * @route   PATCH /api/crm/designations/:id/archive
 * @desc    Archive a designation (soft delete)
 * @access  Private (Admin only)
 */
router.patch('/:id/archive', isStaffAuthenticated, hasRole(['admin']), validate(archiveDesignationSchema), archiveDesignation);

export default router;

