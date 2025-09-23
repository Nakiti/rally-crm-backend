import { Campaign, Donation, Designation, CampaignAvailableDesignation, CampaignQuestion } from '../../../models/index.js';
import { ImageUpload } from '../../../models/imageUpload.model.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffSession } from '../../types/session.types.js';
import { Op, fn, col, literal, Transaction } from 'sequelize';

// Interface for campaign with donation statistics
export interface CampaignWithStats {
  id: string;
  organizationId: string;
  defaultDesignationId?: string;
  internalName: string;
  externalName?: string;
  slug?: string;
  goalAmount?: number;
  icon?: string;
  pageConfig?: object;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  amountRaised: string; // Decimal returned as string from database
  donations: string; // Count returned as string from database
}

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
   * Fetches a single Campaign with donation statistics.
   * The WHERE clause must check for both the id AND the organizationId from the user session to ensure tenancy.
   * @param id - The campaign ID
   */
  public async findById(id: string): Promise<CampaignWithStats | null> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find campaign with both id and organizationId to ensure tenancy, including donation statistics
      const campaign = await Campaign.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        },
        attributes: [
          // Include all campaign attributes
          'id',
          'organizationId',
          'defaultDesignationId',
          'internalName',
          'externalName',
          'slug',
          'goalAmount',
          'icon',
          'pageConfig',
          'isActive',
          'createdAt',
          'updatedAt',
          // Add donation statistics
          [fn('COALESCE', fn('SUM', col('donations.amount')), 0), 'amountRaised'],
          [fn('COUNT', col('donations.id')), 'donations']
        ],
        include: [
          {
            model: Donation,
            as: 'donations',
            attributes: [], // We don't need the actual donation data, just for aggregation
            required: false // LEFT JOIN to include campaigns with no donations
          }
        ],
        group: [
          'Campaign.id',
          'Campaign.organization_id',
          'Campaign.default_designation_id',
          'Campaign.internal_name',
          'Campaign.external_name',
          'Campaign.slug',
          'Campaign.goal_amount',
          'Campaign.icon',
          'Campaign.page_config',
          'Campaign.is_active',
          'Campaign.created_at',
          'Campaign.updated_at'
        ],
        raw: true
      });
      return campaign as unknown as CampaignWithStats | null;
    } catch (error) {
      console.log(error)

      throw new ApiError(500, 'Failed to fetch campaign from database.');
    }
  }

  /**
   * Fetches all campaigns with donation statistics.
   * The WHERE clause must be scoped to the organizationId from the user session.
   */
  public async findAllForOrg(): Promise<CampaignWithStats[]> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find all campaigns with donation statistics using LEFT JOIN
      const campaigns = await Campaign.findAll({
        where: {
          organizationId: this.user.organizationId
        },
        attributes: [
          // Include all campaign attributes
          'id',
          'organizationId',
          'defaultDesignationId',
          'internalName',
          'externalName',
          'slug',
          'goalAmount',
          'icon',
          'pageConfig',
          'isActive',
          'createdAt',
          'updatedAt',
          // Add donation statistics
          [fn('COALESCE', fn('SUM', col('donations.amount')), 0), 'amountRaised'],
          [fn('COUNT', col('donations.id')), 'donations']
        ],
        include: [
          {
            model: Donation,
            as: 'donations',
            attributes: [], // We don't need the actual donation data, just for aggregation
            required: false // LEFT JOIN to include campaigns with no donations
          }
        ],
        group: [
          'Campaign.id',
          'Campaign.organization_id',
          'Campaign.default_designation_id',
          'Campaign.internal_name',
          'Campaign.external_name',
          'Campaign.slug',
          'Campaign.goal_amount',
          'Campaign.icon',
          'Campaign.page_config',
          'Campaign.is_active',
          'Campaign.created_at',
          'Campaign.updated_at'
        ],
        order: [['createdAt', 'DESC']],
        raw: true
      });
      return campaigns as unknown as CampaignWithStats[];
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch campaigns from database.');
    }
  }

  /**
   * Updates a campaign.
   * Must first find the campaign using both id and organizationId to ensure the user has permission to edit it.
   * @param id - The campaign ID
   * @param updateData - The data to update
   * @param transaction - Optional transaction to use for the operation
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
  }, transaction?: Transaction): Promise<Campaign> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find the campaign using both id and organizationId to ensure permission
      const findOptions: any = {
        where: {
          id,
          organizationId: this.user.organizationId
        }
      };
      
      if (transaction) {
        findOptions.transaction = transaction;
      }
      
      const campaign = await Campaign.findOne(findOptions);

      if (!campaign) {
        throw new ApiError(404, 'Campaign not found or access denied.');
      }

      // If slug is being updated, check for uniqueness within the organization
      if (updateData.slug && updateData.slug !== campaign.slug) {
        const existingFindOptions: any = {
          where: {
            slug: updateData.slug,
            organizationId: this.user.organizationId,
            id: { [Op.ne]: id }
          }
        };
        
        if (transaction) {
          existingFindOptions.transaction = transaction;
        }
        
        const existingCampaign = await Campaign.findOne(existingFindOptions);

        if (existingCampaign) {
          throw new ApiError(409, 'A campaign with this slug already exists in your organization.');
        }
      }

      // Update the campaign
      const updateOptions: any = {};
      if (transaction) {
        updateOptions.transaction = transaction;
      }
      await campaign.update(updateData, updateOptions);
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

  /**
   * Fetches a single Campaign with available designations (without donation stats).
   * Used for campaign editor where we need the available designations.
   * @param id - The campaign ID
   */
  public async findByIdWithDesignations(id: string): Promise<Campaign | null> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find campaign with both id and organizationId to ensure tenancy, including available designations
      const campaign = await Campaign.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        },
        include: [
          {
            model: CampaignAvailableDesignation,
            as: 'availableDesignations',
            required: false, // LEFT JOIN to include campaigns with no available designations
            include: [
              {
                model: Designation,
                as: 'designation',
                where: {
                  isArchived: false, // Only include non-archived designations
                },
                required: true,
              }
            ]
          }
        ]
      });
      return campaign;
    } catch (error) {
      console.log(error)
      throw new ApiError(500, 'Failed to fetch campaign from database.');
    }
  }

  /**
   * Fetches a single Campaign with questions (without donation stats).
   * Used for campaign editor where we need the questions.
   * @param id - The campaign ID
   */
  public async findByIdWithQuestions(id: string): Promise<Campaign | null> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find campaign with both id and organizationId to ensure tenancy, including questions
      const campaign = await Campaign.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        },
        include: [
          {
            model: CampaignQuestion,
            as: 'questions',
            required: false, // LEFT JOIN to include campaigns with no questions
            order: [['displayOrder', 'ASC']]
          }
        ]
      });
      return campaign;
    } catch (error) {
      console.log(error)
      throw new ApiError(500, 'Failed to fetch campaign with questions from database.');
    }
  }

  /**
   * Fetches top-performing campaigns based on donations within a time period
   * @param period - Time period: 'week', 'month', or 'year'
   * @param limit - Maximum number of campaigns to return (default: 3)
   * @returns Array of top campaigns with performance metrics
   */
  public async findTopCampaigns(period: 'week' | 'month' | 'year', limit: number = 3): Promise<Array<{
    id: string;
    name: string;
    raised: number;
    goal: number | null;
    donors: number;
  }>> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      const dateRange = this.getDateRange(period);
      
      const campaigns = await Campaign.findAll({
        where: {
          organizationId: this.user.organizationId,
          isActive: true // Only include active campaigns
        },
        attributes: [
          'id',
          'externalName',
          'internalName',
          'goalAmount',
          [
            literal(`(
              SELECT COALESCE(SUM(d.amount), 0)
              FROM donations d
              WHERE d.campaign_id = \`Campaign\`.\`id\`
              AND d.organization_id = \`Campaign\`.\`organization_id\`
              AND d.status = 'completed'
              AND d.created_at >= '${dateRange.start.toISOString()}'
              AND d.created_at <= '${dateRange.end.toISOString()}'
            )`),
            'raised'
          ],
          [
            literal(`(
              SELECT COUNT(DISTINCT d.donor_account_id)
              FROM donations d
              WHERE d.campaign_id = \`Campaign\`.\`id\`
              AND d.organization_id = \`Campaign\`.\`organization_id\`
              AND d.status = 'completed'
              AND d.created_at >= '${dateRange.start.toISOString()}'
              AND d.created_at <= '${dateRange.end.toISOString()}'
            )`),
            'donors'
          ]
        ],
        order: [
          [literal('raised'), 'DESC']
        ],
        limit: limit,
        raw: true
      });

      // Transform the results to match the expected format
      return campaigns.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.externalName || campaign.internalName,
        raised: Math.round(parseFloat(campaign.raised)),
        goal: campaign.goalAmount ? Math.round(campaign.goalAmount) : null,
        donors: parseInt(campaign.donors)
      }));
    } catch (error) {
      console.log(error)
      throw new ApiError(500, 'Failed to fetch top campaigns from database.');
    }
  }

  /**
   * Get date range based on period
   */
  private getDateRange(period: 'week' | 'month' | 'year'): { start: Date, end: Date } {
    const now = new Date();
    let start: Date;

    switch (period) {
      case 'week':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        throw new Error(`Invalid period: ${period}`);
    }

    return { start, end: now };
  }

  /**
   * Confirms image uploads by updating their status from 'pending' to 'confirmed'.
   * This prevents the cleanup job from deleting these images.
   * @param imageUrls - Array of image URLs to confirm
   * @param transaction - Optional transaction to use for the operation
   */
  public async confirmImages(imageUrls: string[], transaction?: Transaction): Promise<void> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    if (imageUrls.length === 0) {
      return; // No images to confirm
    }

    try {
      const imageUpdateOptions: any = {
        where: {
          url: imageUrls,
          organizationId: this.user.organizationId,
        }
      };
      
      if (transaction) {
        imageUpdateOptions.transaction = transaction;
      }
      
      await ImageUpload.update(
        { status: 'confirmed' },
        imageUpdateOptions
      );
    } catch (error) {
      throw new ApiError(500, 'Failed to confirm images in database.');
    }
  }
}
