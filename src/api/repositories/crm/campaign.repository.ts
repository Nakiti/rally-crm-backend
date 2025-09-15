import { Campaign } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffSession } from '../../types/express.types.js';

/**
 * A repository for handling all database operations for Campaigns
 * in the context of the CRM.
 */
export class CrmCampaignRepository {
  private user: StaffSession | null;

  /**
   * Constructor accepts a StaffSession object to establish the security context.
   * @param user - The authenticated staff member's session data
   */
  constructor(user: StaffSession | null = null) {
    this.user = user;
  }

  /**
   * Creates a new Campaign.
   * Must automatically inject the organizationId from the user session.
   * @param campaignData - The data for the new campaign
   */
  public async create(campaignData: {
    defaultDesignationId?: string;
    internalName: string;
    externalName?: string;
    slug?: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
    isActive?: boolean;
  }): Promise<Campaign> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Automatically inject the organizationId from the user session
      const { isActive = false, ...restOfData } = campaignData
      const newCampaign = await Campaign.create({
        ...restOfData,
        isActive,        
        organizationId: this.user.organizationId
      });
      return newCampaign;
    } catch (error: any) {
      // Handle potential database errors, specifically the unique constraint on the slug
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiError(409, 'A campaign with this slug already exists.');
      }
      // For any other database error, throw a generic server error
      throw new ApiError(500, 'Failed to create campaign in database.');
    }
  }

  /**
   * Fetches a single Campaign.
   * The WHERE clause must check for both the id AND the organizationId from the user session to ensure tenancy.
   * @param id - The campaign ID
   */
  public async findById(id: string): Promise<Campaign | null> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find campaign with both id and organizationId to ensure tenancy
      const campaign = await Campaign.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        }
      });
      return campaign;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch campaign from database.');
    }
  }

  /**
   * Fetches all campaigns.
   * The WHERE clause must be scoped to the organizationId from the user session.
   */
  public async findAllForOrg(): Promise<Campaign[]> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find all campaigns scoped to the organizationId from the user session
      const campaigns = await Campaign.findAll({
        where: {
          organizationId: this.user.organizationId
        },
        order: [['createdAt', 'DESC']]
      });
      return campaigns;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch campaigns from database.');
    }
  }

  /**
   * Updates a campaign.
   * Must first find the campaign using both id and organizationId to ensure the user has permission to edit it.
   * @param id - The campaign ID
   * @param updateData - The data to update
   */
  public async update(id: string, updateData: {
    defaultDesignationId?: string;
    internalName?: string;
    externalName?: string;
    slug?: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
    isActive?: boolean;
  }): Promise<Campaign> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find the campaign using both id and organizationId to ensure permission
      const campaign = await Campaign.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        }
      });

      if (!campaign) {
        throw new ApiError(404, 'Campaign not found or access denied.');
      }

      // If slug is being updated, check for uniqueness within the organization
      if (updateData.slug && updateData.slug !== campaign.slug) {
        const existingCampaign = await Campaign.findOne({
          where: {
            slug: updateData.slug,
            organizationId: this.user.organizationId,
            id: { [require('sequelize').Op.ne]: id }
          }
        });

        if (existingCampaign) {
          throw new ApiError(409, 'A campaign with this slug already exists in your organization.');
        }
      }

      // Update the campaign
      await campaign.update(updateData);
      return campaign;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiError(409, 'A campaign with this slug already exists in your organization.');
      }
      throw new ApiError(500, 'Failed to update campaign in database.');
    }
  }

  /**
   * Deletes a campaign.
   * Must first find the campaign using both id and organizationId.
   * @param id - The campaign ID
   */
  public async delete(id: string): Promise<void> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find the campaign using both id and organizationId to ensure permission
      const campaign = await Campaign.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        }
      });

      if (!campaign) {
        throw new ApiError(404, 'Campaign not found or access denied.');
      }

      // Delete the campaign
      await campaign.destroy();
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete campaign from database.');
    }
  }
}
