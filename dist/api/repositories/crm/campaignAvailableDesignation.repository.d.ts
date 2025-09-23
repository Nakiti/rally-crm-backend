import { CampaignAvailableDesignation } from '../../../models/index.js';
import type { CampaignAvailableDesignationCreationAttributes } from '../../../models/campaignAvailableDesignation.model.js';
import type { StaffSession } from '../../types/session.types.js';
/**
 * A repository for handling all database operations for CampaignAvailableDesignations
 * in the context of the CRM. All operations are scoped to the staff member's organization.
 */
export declare class CrmCampaignAvailableDesignationRepository {
    private user;
    constructor(user: StaffSession);
    /**
     * Creates a new campaign available designation within the organization scope
     * @param data - The campaign available designation data
     * @returns The created CampaignAvailableDesignation
     */
    create(data: CampaignAvailableDesignationCreationAttributes): Promise<CampaignAvailableDesignation>;
    /**
     * Fetches all campaign available designations for a specific campaign within the organization scope
     * @param campaignId - The campaign ID
     * @returns Array of campaign available designations with designation details
     */
    findAllForCampaign(campaignId: string): Promise<CampaignAvailableDesignation[]>;
    /**
     * Fetches a single campaign available designation by ID within the organization scope
     * @param id - The campaign available designation ID
     * @returns The campaign available designation or null if not found
     */
    findByIdForOrg(id: string): Promise<CampaignAvailableDesignation | null>;
    /**
     * Deletes a campaign available designation within the organization scope
     * @param id - The campaign available designation ID
     * @returns The deleted CampaignAvailableDesignation
     */
    delete(id: string): Promise<CampaignAvailableDesignation>;
    /**
     * Bulk creates campaign available designations within the organization scope
     * @param campaignId - The campaign ID
     * @param designationIds - Array of designation IDs to create
     * @returns Array of created CampaignAvailableDesignations
     */
    bulkCreate(campaignId: string, designationIds: string[]): Promise<CampaignAvailableDesignation[]>;
    /**
     * Bulk deletes campaign available designations by designation IDs within the organization scope
     * @param campaignId - The campaign ID
     * @param designationIds - Array of designation IDs to remove
     * @returns Number of deleted records
     */
    bulkDeleteByDesignationIds(campaignId: string, designationIds: string[]): Promise<number>;
    /**
     * Gets current designation IDs for a campaign within the organization scope
     * @param campaignId - The campaign ID
     * @returns Array of current designation IDs
     */
    getCurrentDesignationIds(campaignId: string): Promise<string[]>;
}
//# sourceMappingURL=campaignAvailableDesignation.repository.d.ts.map