import { Campaign } from '../../../models/index.js';
import { type CampaignWithStats } from '../../repositories/crm/campaign.repository.js';
import type { StaffSession } from '../../types/session.types.js';
interface CreateCampaignData {
    defaultDesignationId?: string;
    internalName: string;
    externalName?: string;
    title?: string;
    slug?: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
    isActive?: boolean;
}
interface UpdateCampaignData {
    defaultDesignationId?: string;
    internalName?: string;
    externalName?: string;
    slug?: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
    isActive?: boolean;
}
/**
 * Create a new campaign for staff
 * @param campaignData - The campaign data
 * @param staffSession - The authenticated staff session
 */
export declare const createCampaignForStaff: (campaignData: CreateCampaignData, staffSession: StaffSession) => Promise<Campaign>;
/**
 * Get all campaigns for the organization with donation statistics
 * @param staffSession - The authenticated staff session
 */
export declare const getCampaignsForOrg: (staffSession: StaffSession) => Promise<CampaignWithStats[]>;
/**
 * Get a single campaign by ID for staff with donation statistics
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export declare const getCampaignByIdForStaff: (id: string, staffSession: StaffSession) => Promise<CampaignWithStats>;
/**
 * Update a campaign for staff
 * @param id - The campaign ID
 * @param updateData - The update data
 * @param staffSession - The authenticated staff session
 */
export declare const updateCampaignForStaff: (id: string, updateData: UpdateCampaignData, staffSession: StaffSession) => Promise<Campaign>;
/**
 * Delete a campaign for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export declare const deleteCampaignForStaff: (id: string, staffSession: StaffSession) => Promise<void>;
/**
 * Get campaign page configuration
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export declare const getCampaignPageConfig: (id: string, staffSession: StaffSession) => Promise<object | null>;
/**
 * Update campaign page configuration
 * @param id - The campaign ID
 * @param pageConfig - The new page configuration
 * @param staffSession - The authenticated staff session
 */
export declare const updateCampaignPageConfig: (id: string, pageConfig: object, staffSession: StaffSession) => Promise<Campaign>;
/**
 * Get a single campaign by ID with available designations for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export declare const getCampaignByIdWithDesignationsForStaff: (id: string, staffSession: StaffSession) => Promise<Campaign>;
/**
 * Get a single campaign by ID with questions for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export declare const getCampaignByIdWithQuestionsForStaff: (id: string, staffSession: StaffSession) => Promise<Campaign>;
/**
 * Get top-performing campaigns for the organization
 * @param staffSession - The authenticated staff session
 * @param period - Time period: 'week', 'month', or 'year'
 * @param limit - Maximum number of campaigns to return (default: 3)
 */
export declare const getTopCampaigns: (staffSession: StaffSession, period?: "week" | "month" | "year", limit?: number) => Promise<Array<{
    id: string;
    name: string;
    raised: number;
    goal: number | null;
    donors: number;
}>>;
/**
 * Publish a campaign with validation and transaction support
 * @param id - The campaign ID
 * @param pageConfig - The updated page configuration
 * @param staffSession - The authenticated staff session
 */
export declare const publishCampaign: (id: string, pageConfig: object, staffSession: StaffSession) => Promise<Campaign>;
export {};
//# sourceMappingURL=campaign.service.d.ts.map