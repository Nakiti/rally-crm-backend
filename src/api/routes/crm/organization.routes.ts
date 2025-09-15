import { Router } from 'express';
import * as organizationController from '../../controllers/crm/organization.controller.js'
import { createOrganizationSchema, updateOrganizationSchema } from './organization.schemas.js'
import { validate } from '../../middleware/validate.js'
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js'
import { hasRole } from '../../middleware/hasRole.js'

const router = Router();

// Route to create a new organization
// POST /api/organizations
router.post('/', validate(createOrganizationSchema), organizationController.createNewOrganization);

// Route to get organization by ID (with authorization)
// GET /api/organizations/:id
router.get('/:id', isStaffAuthenticated, hasRole(['admin', 'editor']), organizationController.getOrganization);

// Route to update organization by ID (with authorization)
// PUT /api/organizations/:id
router.put('/:id', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(updateOrganizationSchema), organizationController.updateOrganization);

// Route to delete organization by ID (with authorization)
// DELETE /api/organizations/:id
router.delete('/:id', isStaffAuthenticated, hasRole(['admin']), organizationController.deleteOrganization);

export default router;
