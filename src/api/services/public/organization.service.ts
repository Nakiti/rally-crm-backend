import { PublicOrganizationRepository } from '../../repositories/public/organization.repository.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * Service for handling public-facing organization operations.
 * This service only returns safe, non-sensitive information.
 */
export class PublicOrganizationService {
  private repository: PublicOrganizationRepository;

  constructor() {
    this.repository = new PublicOrganizationRepository();
  }

  /**
   * Get organization by subdomain (public information only)
   * @param subdomain - The organization's subdomain
   * @returns Public organization data
   */
  public async getOrganizationBySubdomain(subdomain: string): Promise<{
    id: string;
    name: string;
    subdomain: string;
  }> {
    try {
      const organization = await this.repository.findBySubdomain(subdomain);
      
      if (!organization) {
        throw new ApiError(404, 'Organization not found');
      }

      return organization;
    } catch (error) {
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
  public async getOrganizationById(id: string): Promise<{
    id: string;
    name: string;
    subdomain: string;
  }> {
    try {
      const organization = await this.repository.findById(id);
      
      if (!organization) {
        throw new ApiError(404, 'Organization not found');
      }

      return organization;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch organization');
    }
  }
}

// Export convenience functions for direct use
const publicOrganizationService = new PublicOrganizationService();

export const getOrganizationBySubdomain = (subdomain: string) => 
  publicOrganizationService.getOrganizationBySubdomain(subdomain);

export const getOrganizationById = (id: string) => 
  publicOrganizationService.getOrganizationById(id);