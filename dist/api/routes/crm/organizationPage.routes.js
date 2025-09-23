import { Router } from 'express';
import { createOrganizationPage, getOrganizationPages, getOrganizationPageById, getOrganizationPageByType, updateOrganizationPage, deleteOrganizationPage, getOrganizationPageContentConfig, updateOrganizationPageContentConfig, publishOrganizationPage } from '../../controllers/crm/organizationPage.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import { createOrganizationPageSchema, updateOrganizationPageSchema, getOrganizationPageByIdSchema, getOrganizationPageByTypeSchema, deleteOrganizationPageSchema, updateContentConfigSchema, getContentConfigSchema, publishOrganizationPageSchema, } from './organizationPage.schemas.js';
const router = Router();
// All routes require authentication
router.use(isStaffAuthenticated);
/**
 * @route   POST /api/crm/organization-pages
 * @desc    Create a new organization page for the organization
 * @access  Private (Admin, Editor)
 */
router.post('/', hasRole(['admin', 'editor']), validate(createOrganizationPageSchema), createOrganizationPage);
/**
 * @route   GET /api/crm/organization-pages
 * @desc    Get all organization pages for the organization
 * @access  Private (Admin, Editor)
 */
router.get('/', hasRole(['admin', 'editor']), getOrganizationPages);
/**
 * @route   GET /api/crm/organization-pages/type/:pageType
 * @desc    Get a single organization page by page type
 * @access  Private (Admin, Editor)
 */
router.get('/type/:pageType', hasRole(['admin', 'editor']), validate(getOrganizationPageByTypeSchema), getOrganizationPageByType);
/**
 * @route   GET /api/crm/organization-pages/:id
 * @desc    Get a single organization page by ID
 * @access  Private (Admin, Editor)
 */
router.get('/:id', hasRole(['admin', 'editor']), validate(getOrganizationPageByIdSchema), getOrganizationPageById);
/**
 * @route   PUT /api/crm/organization-pages/:id
 * @desc    Update an organization page
 * @access  Private (Admin, Editor)
 */
router.put('/:id', hasRole(['admin', 'editor']), validate(updateOrganizationPageSchema), updateOrganizationPage);
/**
 * @route   DELETE /api/crm/organization-pages/:id
 * @desc    Delete an organization page
 * @access  Private (Admin only)
 */
router.delete('/:id', hasRole(['admin']), validate(deleteOrganizationPageSchema), deleteOrganizationPage);
/**
 * @route   GET /api/crm/organization-pages/:id/content-config
 * @desc    Get organization page content configuration
 * @access  Private (Admin, Editor)
 */
router.get('/:id/content-config', hasRole(['admin', 'editor']), validate(getContentConfigSchema), getOrganizationPageContentConfig);
/**
 * @route   PUT /api/crm/organization-pages/:id/content-config
 * @desc    Update organization page content configuration
 * @access  Private (Admin, Editor)
 */
router.put('/:id/content-config', hasRole(['admin', 'editor']), validate(updateContentConfigSchema), updateOrganizationPageContentConfig);
/**
 * @route   PATCH /api/crm/organization-pages/:pageSlug/publish
 * @desc    Publish organization page - updates content config and sets is_published to true
 * @access  Private (Admin, Editor)
 */
router.patch('/:pageSlug/publish', hasRole(['admin', 'editor']), validate(publishOrganizationPageSchema), publishOrganizationPage);
export default router;
//# sourceMappingURL=organizationPage.routes.js.map