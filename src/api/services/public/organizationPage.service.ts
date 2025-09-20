import { PublicOrganizationPageRepository } from '../../repositories/public/organizationPage.repository.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * Service for handling public-facing organization page operations.
 * This service only returns safe, non-sensitive information.
 */
export class PublicOrganizationPageService {
  private repository: PublicOrganizationPageRepository;

  constructor() {
    this.repository = new PublicOrganizationPageRepository();
  }

  /**
   * Get organization page by organization ID and page type (public information only)
   * @param organizationId - The organization's ID
   * @param pageType - The page type
   * @returns Public organization page data
   */
  public async getOrganizationPageByType(organizationId: string, pageType: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  }> {
    try {
      const page = await this.repository.findByOrganizationIdAndType(organizationId, pageType);
      
      if (!page) {
        throw new ApiError(404, 'Organization page not found');
      }

      return page;
    } catch (error) {
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
  public async getOrganizationPageBySubdomainAndType(subdomain: string, pageType: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  }> {
    try {
      const page = await this.repository.findBySubdomainAndType(subdomain, pageType);
      
      if (!page) {
        throw new ApiError(404, 'Organization page not found');
      }

      return page;
    } catch (error) {
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
  public async getOrganizationPages(organizationId: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  }[]> {
    try {
      const pages = await this.repository.findAllByOrganizationId(organizationId);
      return pages;
    } catch (error) {
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
  public async getOrganizationPagesBySubdomain(subdomain: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  }[]> {
    try {
      const pages = await this.repository.findAllBySubdomain(subdomain);
      return pages;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch organization pages');
    }
  }
}

// Export convenience functions for direct use
const publicOrganizationPageService = new PublicOrganizationPageService();

export const getOrganizationPageByType = (organizationId: string, pageType: string) => 
  publicOrganizationPageService.getOrganizationPageByType(organizationId, pageType);

export const getOrganizationPageBySubdomainAndType = (subdomain: string, pageType: string) => 
  publicOrganizationPageService.getOrganizationPageBySubdomainAndType(subdomain, pageType);

export const getOrganizationPages = (organizationId: string) => 
  publicOrganizationPageService.getOrganizationPages(organizationId);

export const getOrganizationPagesBySubdomain = (subdomain: string) => 
  publicOrganizationPageService.getOrganizationPagesBySubdomain(subdomain);
