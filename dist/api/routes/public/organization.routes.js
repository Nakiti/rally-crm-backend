import { Router } from 'express';
import { getOrganizationBySubdomainController, getOrganizationByIdController } from '../../controllers/public/organization.controller.js';
const router = Router();
/**
 * @route   GET /api/public/organizations/subdomain/:subdomain
 * @desc    Get organization by subdomain (public information only)
 * @access  Public
 */
router.get('/subdomain/:subdomain', getOrganizationBySubdomainController);
/**
 * @route   GET /api/public/organizations/:id
 * @desc    Get organization by ID (public information only)
 * @access  Public
 */
router.get('/:id', getOrganizationByIdController);
export default router;
//# sourceMappingURL=organization.routes.js.map