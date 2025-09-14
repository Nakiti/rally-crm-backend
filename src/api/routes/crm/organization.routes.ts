import { Router } from 'express';
import * as organizationController from '../../controllers/crm/organization.controller'
import { createOrganizationSchema, updateOrganizationSchema } from './organization.schemas'
import { validate } from '../../../utils/validate'
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated'

const router = Router();

// Route to create a new organization
// POST /api/organizations
router.post('/', validate(createOrganizationSchema), organizationController.createNewOrganization);

// Route to get all organizations (admin only)
// GET /api/organizations
router.get('/', isStaffAuthenticated, organizationController.getAllOrganizations);


// Route to get organization by ID (with authorization)
// GET /api/organizations/:id
router.get('/:id', isStaffAuthenticated, organizationController.getOrganization);

// Route to update organization by ID (with authorization)
// PUT /api/organizations/:id
router.put('/:id', isStaffAuthenticated, validate(updateOrganizationSchema), organizationController.updateOrganization);

// Route to delete organization by ID (with authorization)
// DELETE /api/organizations/:id
router.delete('/:id', isStaffAuthenticated, organizationController.deleteOrganization);

export default router;
