import { getOrganizationBySubdomain, getOrganizationById } from '../../services/public/organization.service.js';
/**
 * Get organization by subdomain (public information only)
 * GET /api/public/organizations/subdomain/:subdomain
 */
export const getOrganizationBySubdomainController = async (req, res, next) => {
    try {
        const { subdomain } = req.params;
        if (!subdomain) {
            res.status(400).json({
                success: false,
                message: 'Subdomain parameter is required'
            });
            return;
        }
        const organization = await getOrganizationBySubdomain(subdomain);
        res.status(200).json({
            success: true,
            data: organization,
            message: 'Organization retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get organization by ID (public information only)
 * GET /api/public/organizations/:id
 */
export const getOrganizationByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Organization ID parameter is required'
            });
            return;
        }
        const organization = await getOrganizationById(id);
        res.status(200).json({
            success: true,
            data: organization,
            message: 'Organization retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=organization.controller.js.map