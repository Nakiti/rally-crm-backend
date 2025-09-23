import { PublicOrganizationPageRepository } from '../../repositories/public/organizationPage.repository.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Service for handling public-facing organization page operations.
 * This service only returns safe, non-sensitive information.
 */
export class PublicOrganizationPageService {
    repository;
    constructor() {
        this.repository = new PublicOrganizationPageRepository();
    }
    /**
     * Get organization page by organization ID and page type (public information only)
     * @param organizationId - The organization's ID
     * @param pageType - The page type
     * @returns Public organization page data
     */
    async getOrganizationPageByType(organizationId, pageType) {
        try {
            const page = await this.repository.findByOrganizationIdAndType(organizationId, pageType);
            if (!page) {
                throw new ApiError(404, 'Organization page not found');
            }
            return page;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch organization page');
        }
    }
    /**
     * Get organization page by organization subdomain and page type (public information only)
     * @param subdomain - The organization's subdomain
     * @param pageType - The page type
     * @returns Public organization page data
     */
    async getOrganizationPageBySubdomainAndType(subdomain, pageType) {
        try {
            const page = await this.repository.findBySubdomainAndType(subdomain, pageType);
            if (!page) {
                throw new ApiError(404, 'Organization page not found');
            }
            return page;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch organization page');
        }
    }
    /**
     * Get all organization pages for an organization by ID (public information only)
     * @param organizationId - The organization's ID
     * @returns Array of public organization page data
     */
    async getOrganizationPages(organizationId) {
        try {
            const pages = await this.repository.findAllByOrganizationId(organizationId);
            return pages;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch organization pages');
        }
    }
    /**
     * Get all organization pages for an organization by subdomain (public information only)
     * @param subdomain - The organization's subdomain
     * @returns Array of public organization page data
     */
    async getOrganizationPagesBySubdomain(subdomain) {
        try {
            const pages = await this.repository.findAllBySubdomain(subdomain);
            return pages;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch organization pages');
        }
    }
}
// Export convenience functions for direct use
const publicOrganizationPageService = new PublicOrganizationPageService();
export const getOrganizationPageByType = (organizationId, pageType) => publicOrganizationPageService.getOrganizationPageByType(organizationId, pageType);
export const getOrganizationPageBySubdomainAndType = (subdomain, pageType) => publicOrganizationPageService.getOrganizationPageBySubdomainAndType(subdomain, pageType);
export const getOrganizationPages = (organizationId) => publicOrganizationPageService.getOrganizationPages(organizationId);
export const getOrganizationPagesBySubdomain = (subdomain) => publicOrganizationPageService.getOrganizationPagesBySubdomain(subdomain);
//# sourceMappingURL=organizationPage.service.js.map