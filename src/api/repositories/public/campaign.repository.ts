import { Campaign, Organization, Designation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * A repository for handling public campaign operations.
 * This repository is used for public-facing campaign functionality
 * where campaigns are accessed by subdomain context.
 */
export class PublicCampaignRepository {
  private subdomain: string;

  /**
   * Constructor accepts a subdomain string to establish the context.
   * @param subdomain - The organization's subdomain for tenancy
   */
  constructor(subdomain: string) {
    this.subdomain = subdomain;
  }

  /**
   * Finds a campaign by slug.
   * This is the primary method that finds a campaign where:
   * - The slug matches the provided slug
   * - The campaign isActive is true
   * - The organization's subdomain matches the one provided to the constructor (tenancy check)
   * @param slug - The campaign slug to search for
   * @returns Promise<Campaign | null> - The found campaign or null if not found
   */
  public async findBySlug(slug: string): Promise<Campaign | null> {
    try {
      const campaign = await Campaign.findOne({
        where: {
          slug,
          isActive: true
        },
        include: [
          {
            model: Organization,
            where: {
              subdomain: this.subdomain
            },
            attributes: [] // We don't need organization data, just for the join
          },
          {
            // 2. Second include fetches the associated designations
            model: Designation,
            as: 'availableDesignations', // This 'as' alias must match what you defined in models/index.ts
            attributes: ['id', 'name'], // Only select public-safe fields
            through: { attributes: [] } // Excludes the join table attributes from the result
          }
        ]
      });

      return campaign;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch campaign from database.');
    }
  }
}
