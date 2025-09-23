import { Router } from 'express';
import * as organizationController from '../../controllers/crm/organization.controller.js';
import * as organizationCompletenessController from '../../controllers/crm/organizationCompleteness.controller.js';
import { createOrganizationSchema, updateCurrentOrganizationSchema } from './organization.schemas.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
const router = Router();
// Route to create a new organization
// POST /api/organizations
router.post('/', validate(createOrganizationSchema), organizationController.createNewOrganization);
// Route to get current user's organization (with authorization)
// GET /api/organizations/current
router.get('/current', isStaffAuthenticated, hasRole(['admin', 'editor']), organizationController.getCurrentOrganization);
// Route to update current user's organization (with authorization)
// PUT /api/organizations/current
router.put('/current', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(updateCurrentOrganizationSchema), organizationController.updateCurrentOrganization);
// Route to check and update organization completeness status
// POST /api/organizations/current/check-completeness
router.post('/current/check-completeness', isStaffAuthenticated, hasRole(['admin', 'editor']), organizationCompletenessController.checkOrganizationCompleteness);
// Route to get organization completeness status details
// GET /api/organizations/current/completeness-status
router.get('/current/completeness-status', isStaffAuthenticated, hasRole(['admin', 'editor']), organizationCompletenessController.getOrganizationCompletenessStatus);
// Route to publish site - runs final completeness check and publishes if all requirements are met
// PATCH /api/crm/organizations/publish-site
router.patch('/publish-site', isStaffAuthenticated, hasRole(['admin', 'editor']), organizationCompletenessController.publishSite);
// // Route to delete organization by ID (with authorization)
// // DELETE /api/organizations/:id
// router.delete('/:id', isStaffAuthenticated, hasRole(['admin']), organizationController.deleteOrganization);
export default router;
//# sourceMappingURL=organization.routes.js.map