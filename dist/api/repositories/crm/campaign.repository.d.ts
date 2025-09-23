import { Campaign } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
import { Transaction } from 'sequelize';
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
    amountRaised: string;
    donations: string;
}
/**
 * A repository for handling all database operations for Campaigns
 * in the context of the CRM.
 */
export declare class CrmCampaignRepository {
    private user;
    /**
     * Constructor accepts a StaffSession object to establish the security context.
     * @param user - The authenticated staff member's session data
     */
    constructor(user?: StaffSession | null);
    /**
     * Creates a new Campaign.
     * Must automatically inject the organizationId from the user session.
     * @param campaignData - The data for the new campaign
     */
    create(campaignData: {
        defaultDesignationId?: string;
        internalName: string;
        externalName?: string;
        slug?: string;
        goalAmount?: number;
        icon?: string;
        pageConfig?: object;
        isActive?: boolean;
    }): Promise<Campaign>;
    /**
     * Fetches a single Campaign with donation statistics.
     * The WHERE clause must check for both the id AND the organizationId from the user session to ensure tenancy.
     * @param id - The campaign ID
     */
    findById(id: string): Promise<CampaignWithStats | null>;
    /**
     * Fetches all campaigns with donation statistics.
     * The WHERE clause must be scoped to the organizationId from the user session.
     */
    findAllForOrg(): Promise<CampaignWithStats[]>;
    /**
     * Updates a campaign.
     * Must first find the campaign using both id and organizationId to ensure the user has permission to edit it.
     * @param id - The campaign ID
     * @param updateData - The data to update
     * @param transaction - Optional transaction to use for the operation
     */
    update(id: string, updateData: {
        defaultDesignationId?: string;
        internalName?: string;
        externalName?: string;
        slug?: string;
        goalAmount?: number;
        icon?: string;
        pageConfig?: object;
        isActive?: boolean;
    }, transaction?: Transaction): Promise<Campaign>;
    /**
     * Deletes a campaign.
     * Must first find the campaign using both id and organizationId.
     * @param id - The campaign ID
     */
    delete(id: string): Promise<void>;
    /**
     * Fetches a single Campaign with available designations (without donation stats).
     * Used for campaign editor where we need the available designations.
     * @param id - The campaign ID
     */
    findByIdWithDesignations(id: string): Promise<Campaign | null>;
    /**
     * Fetches a single Campaign with questions (without donation stats).
     * Used for campaign editor where we need the questions.
     * @param id - The campaign ID
     */
    findByIdWithQuestions(id: string): Promise<Campaign | null>;
    /**
     * Fetches top-performing campaigns based on donations within a time period
     * @param period - Time period: 'week', 'month', or 'year'
     * @param limit - Maximum number of campaigns to return (default: 3)
     * @returns Array of top campaigns with performance metrics
     */
    findTopCampaigns(period: 'week' | 'month' | 'year', limit?: number): Promise<Array<{
        id: string;
        name: string;
        raised: number;
        goal: number | null;
        donors: number;
    }>>;
    /**
     * Get date range based on period
     */
    private getDateRange;
    /**
     * Confirms image uploads by updating their status from 'pending' to 'confirmed'.
     * This prevents the cleanup job from deleting these images.
     * @param imageUrls - Array of image URLs to confirm
     * @param transaction - Optional transaction to use for the operation
     */
    confirmImages(imageUrls: string[], transaction?: Transaction): Promise<void>;
}
//# sourceMappingURL=campaign.repository.d.ts.map