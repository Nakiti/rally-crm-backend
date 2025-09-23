import { createOrganizationPageForStaff, getOrganizationPagesForOrg, getOrganizationPageByIdForStaff, getOrganizationPageByTypeForStaff, updateOrganizationPageForStaff, deleteOrganizationPageForStaff, getOrganizationPageContentConfig as getOrganizationPageContentConfigService, updateOrganizationPageContentConfig as updateOrganizationPageContentConfigService, publishOrganizationPage as publishOrganizationPageService } from '../../services/crm/organizationPage.service.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Create a new organization page for the authenticated staff member's organization
 * POST /api/crm/organization-pages
 */
export const createOrganizationPage = async (req, res, next) => {
    try {
        const pageData = req.body;
        const staffSession = req.user;
        const page = await createOrganizationPageForStaff(pageData, staffSession);
        res.status(201).json({
            success: true,
            data: page,
            message: 'Organization page created successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all organization pages for the authenticated staff member's organization
 * GET /api/crm/organization-pages
 */
export const getOrganizationPages = async (req, res, next) => {
    try {
        const staffSession = req.user;
        const pages = await getOrganizationPagesForOrg(staffSession);
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
 * Get a single organization page by ID for the authenticated staff member
 * GET /api/crm/organization-pages/:id
 */
export const getOrganizationPageById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Organization page ID is required');
        }
        const page = await getOrganizationPageByIdForStaff(id, staffSession);
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
 * Get a single organization page by page type for the authenticated staff member
 * GET /api/crm/organization-pages/type/:pageType
 */
export const getOrganizationPageByType = async (req, res, next) => {
    try {
        const { pageType } = req.params;
        const staffSession = req.user;
        if (!pageType) {
            throw new ApiError(400, 'Page type is required');
        }
        const page = await getOrganizationPageByTypeForStaff(pageType, staffSession);
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
 * Update an organization page for the authenticated staff member
 * PUT /api/crm/organization-pages/:id
 */
export const updateOrganizationPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Organization page ID is required');
        }
        const page = await updateOrganizationPageForStaff(id, updateData, staffSession);
        res.status(200).json({
            success: true,
            data: page,
            message: 'Organization page updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Delete an organization page for the authenticated staff member
 * DELETE /api/crm/organization-pages/:id
 */
export const deleteOrganizationPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Organization page ID is required');
        }
        await deleteOrganizationPageForStaff(id, staffSession);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Organization page deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get organization page content configuration
 * GET /api/crm/organization-pages/:id/content-config
 */
export const getOrganizationPageContentConfig = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Organization page ID is required');
        }
        const contentConfig = await getOrganizationPageContentConfigService(id, staffSession);
        res.status(200).json({
            success: true,
            data: contentConfig,
            message: 'Organization page content configuration retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Update organization page content configuration
 * PUT /api/crm/organization-pages/:id/content-config
 */
export const updateOrganizationPageContentConfig = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { contentConfig } = req.body;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Organization page ID is required');
        }
        const page = await updateOrganizationPageContentConfigService(id, contentConfig, staffSession);
        res.status(200).json({
            success: true,
            data: page,
            message: 'Organization page content configuration updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Publish organization page - updates content config and sets is_published to true
 * PATCH /api/crm/organization-pages/:pageSlug/publish
 */
export const publishOrganizationPage = async (req, res, next) => {
    try {
        const { pageSlug } = req.params;
        const { contentConfig } = req.body;
        const staffSession = req.user;
        if (!pageSlug) {
            throw new ApiError(400, 'Page slug is required');
        }
        const page = await publishOrganizationPageService(pageSlug, contentConfig, staffSession);
        res.status(200).json({
            success: true,
            data: page,
            message: 'Organization page published successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=organizationPage.controller.js.map