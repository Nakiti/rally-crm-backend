import { Router } from 'express';
import {
  getOrganizationPageByTypeController,
  getOrganizationPageBySubdomainAndTypeController,
  getOrganizationPagesController,
  getOrganizationPagesBySubdomainController
} from '../../controllers/public/organizationPage.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  getOrganizationPageByTypeSchema,
  getOrganizationPageBySubdomainAndTypeSchema,
  getOrganizationPagesSchema,
  getOrganizationPagesBySubdomainSchema,
} from './organizationPage.schemas.js';

const router = Router();

/**
 * @route   GET /api/public/organizations/:id/pages
 * @desc    Get all organization pages for an organization by ID (public information only)
 * @access  Public
 */
router.get('/:id/pages', validate(getOrganizationPagesSchema), getOrganizationPagesController);

/**
 * @route   GET /api/public/organizations/:id/pages/type/:pageType
 * @desc    Get organization page by organization ID and page type (public information only)
 * @access  Public
 */
router.get('/:id/pages/type/:pageType', validate(getOrganizationPageByTypeSchema), getOrganizationPageByTypeController);

/**
 * @route   GET /api/public/organizations/subdomain/:subdomain/pages
 * @desc    Get all organization pages for an organization by subdomain (public information only)
 * @access  Public
 */
router.get('/subdomain/:subdomain/pages', validate(getOrganizationPagesBySubdomainSchema), getOrganizationPagesBySubdomainController);

/**
 * @route   GET /api/public/organizations/subdomain/:subdomain/pages/type/:pageType
 * @desc    Get organization page by organization subdomain and page type (public information only)
 * @access  Public
 */
router.get('/subdomain/:subdomain/pages/type/:pageType', validate(getOrganizationPageBySubdomainAndTypeSchema), getOrganizationPageBySubdomainAndTypeController);

export default router;
