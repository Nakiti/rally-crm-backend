import { Router } from 'express';
import * as organizationController from '../../controllers/crm/organization.controller'

const router = Router();

// Route to create a new organization
// POST /api/organizations
router.post('/', organizationController.createNewOrganization);

export default router;
