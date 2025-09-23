import { getOrganizationPageByType, getOrganizationPageBySubdomainAndType, getOrganizationPages, getOrganizationPagesBySubdomain } from '../../services/public/organizationPage.service.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Get organization page by organization ID and page type (public information only)
 * GET /api/public/organizations/:id/pages/type/:pageType
 */
export const getOrganizationPageByTypeController = async (req, res, next) => {
    try {
        const { id: organizationId, pageType } = req.params;
        if (!organizationId) {
            throw new ApiError(400, 'Organization ID parameter is required');
        }
        if (!pageType) {
            throw new ApiError(400, 'Page type parameter is required');
        }
        // Validate page type
        if (!['landing', 'about'].includes(pageType)) {
            throw new ApiError(400, 'Invalid page type. Must be "landing" or "about"');
        }
        const page = await getOrganizationPageByType(organizationId, pageType);
        res.status(200).json({
            success: true,
            data: page,
            message: 'Organization page retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get organization page by organization subdomain and page type (public information only)
 * GET /api/public/organizations/subdomain/:subdomain/pages/type/:pageType
 */
export const getOrganizationPageBySubdomainAndTypeController = async (req, res, next) => {
    try {
        const { subdomain, pageType } = req.params;
        if (!subdomain) {
            throw new ApiError(400, 'Subdomain parameter is required');
        }
        if (!pageType) {
            throw new ApiError(400, 'Page type parameter is required');
        }
        // Validate page type
        if (!['landing', 'about'].includes(pageType)) {
            throw new ApiError(400, 'Invalid page type. Must be "landing" or "about"');
        }
        const page = await getOrganizationPageBySubdomainAndType(subdomain, pageType);
        res.status(200).json({
            success: true,
            data: page,
            message: 'Organization page retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all organization pages for an organization by ID (public information only)
 * GET /api/public/organizations/:id/pages
 */
export const getOrganizationPagesController = async (req, res, next) => {
    try {
        const { id: organizationId } = req.params;
        if (!organizationId) {
            throw new ApiError(400, 'Organization ID parameter is required');
        }
        const pages = await getOrganizationPages(organizationId);
        res.status(200).json({
            success: true,
            data: pages,
            message: 'Organization pages retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all organization pages for an organization by subdomain (public information only)
 * GET /api/public/organizations/subdomain/:subdomain/pages
 */
export const getOrganizationPagesBySubdomainController = async (req, res, next) => {
    try {
        const { subdomain } = req.params;
        if (!subdomain) {
            throw new ApiError(400, 'Subdomain parameter is required');
        }
        const pages = await getOrganizationPagesBySubdomain(subdomain);
        res.status(200).json({
            success: true,
            data: pages,
            message: 'Organization pages retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=organizationPage.controller.js.map