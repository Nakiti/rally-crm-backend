import { getDonorsForOrg, getDonorProfile } from '../../services/crm/donor.service.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Get all donors for the authenticated staff member's organization with optional filtering and pagination
 * GET /api/crm/donors
 */
export const getDonors = async (req, res, next) => {
    try {
        const staffSession = req.user;
        // Parse pagination and filter query parameters
        const { name, email, page, limit } = req.query;
        // Convert string query parameters to appropriate types
        const filters = {
            name: name,
            email: email,
            page: page ? parseInt(page, 10) : undefined,
            limit: limit ? parseInt(limit, 10) : undefined
        };
        // Validate pagination parameters
        if (filters.page && (isNaN(filters.page) || filters.page < 1)) {
            throw new ApiError(400, 'Page must be a positive integer');
        }
        if (filters.limit && (isNaN(filters.limit) || filters.limit < 1 || filters.limit > 100)) {
            throw new ApiError(400, 'Limit must be a positive integer between 1 and 100');
        }
        const result = await getDonorsForOrg(staffSession, filters);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Donors retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get a single donor profile by ID with their complete donation history
 * GET /api/crm/donors/:id
 */
export const getDonor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Donor ID is required');
        }
        const donor = await getDonorProfile(id, staffSession);
        res.status(200).json({
            success: true,
            data: donor,
            message: 'Donor profile retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=donor.controller.js.map