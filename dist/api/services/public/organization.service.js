import { PublicOrganizationRepository } from '../../repositories/public/organization.repository.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Service for handling public-facing organization operations.
 * This service only returns safe, non-sensitive information.
 */
export class PublicOrganizationService {
    repository;
    constructor() {
        this.repository = new PublicOrganizationRepository();
    }
    /**
     * Get organization by subdomain (public information only)
     * @param subdomain - The organization's subdomain
     * @returns Public organization data
     */
    async getOrganizationBySubdomain(subdomain) {
        try {
            const organization = await this.repository.findBySubdomain(subdomain);
            if (!organization) {
                throw new ApiError(404, 'Organization not found');
            }
            return organization;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch organization');
        }
    }
    /**
     * Get organization by ID (public information only)
     * @param id - The organization's ID
     * @returns Public organization data
     */
    async getOrganizationById(id) {
        try {
            const organization = await this.repository.findById(id);
            if (!organization) {
                throw new ApiError(404, 'Organization not found');
            }
            return organization;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch organization');
        }
    }
}
// Export convenience functions for direct use
const publicOrganizationService = new PublicOrganizationService();
export const getOrganizationBySubdomain = (subdomain) => publicOrganizationService.getOrganizationBySubdomain(subdomain);
export const getOrganizationById = (id) => publicOrganizationService.getOrganizationById(id);
//# sourceMappingURL=organization.service.js.map