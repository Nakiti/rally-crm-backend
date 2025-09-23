import { CampaignAvailableDesignation } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
interface CreateCampaignAvailableDesignationData {
    campaignId: string;
    designationId: string;
}
/**
 * Service for handling CRM campaign available designation management operations.
 * These operations require authentication and organization context.
 */
export declare class CrmCampaignAvailableDesignationService {
    /**
     * Create a new campaign available designation
     * @param staffSession - The authenticated staff session
     * @param data - The campaign available designation data
     * @returns The created campaign available designation
     */
    createCampaignAvailableDesignation(staffSession: StaffSession, data: CreateCampaignAvailableDesignationData): Promise<CampaignAvailableDesignation>;
    /**
     * Get all campaign available designations for a specific campaign
     * @param staffSession - The authenticated staff session
     * @param campaignId - The campaign ID
     * @returns Array of campaign available designations
     */
    getCampaignAvailableDesignations(staffSession: StaffSession, campaignId: string): Promise<CampaignAvailableDesignation[]>;
    /**
     * Get a specific campaign available designation by ID
     * @param staffSession - The authenticated staff session
     * @param id - The campaign available designation ID
     * @returns The campaign available designation
     */
    getCampaignAvailableDesignation(staffSession: StaffSession, id: string): Promise<CampaignAvailableDesignation>;
    /**
     * Delete a campaign available designation
     * @param staffSession - The authenticated staff session
     * @param id - The campaign available designation ID
     * @returns The deleted campaign available designation
     */
    deleteCampaignAvailableDesignation(staffSession: StaffSession, id: string): Promise<CampaignAvailableDesignation>;
    /**
     * Update campaign designations by comparing current vs new and performing bulk operations
     * @param staffSession - The authenticated staff session
     * @param campaignId - The campaign ID
     * @param newDesignationIds - Array of new designation IDs
     * @returns Object with operation results
     */
    updateCampaignDesignations(staffSession: StaffSession, campaignId: string, newDesignationIds: string[]): Promise<{
        added: number;
        removed: number;
        total: number;
    }>;
}
export declare const createCampaignAvailableDesignation: (staffSession: StaffSession, data: CreateCampaignAvailableDesignationData) => Promise<CampaignAvailableDesignation>;
export declare const getCampaignAvailableDesignations: (staffSession: StaffSession, campaignId: string) => Promise<CampaignAvailableDesignation[]>;
export declare const getCampaignAvailableDesignation: (staffSession: StaffSession, id: string) => Promise<CampaignAvailableDesignation>;
export declare const deleteCampaignAvailableDesignation: (staffSession: StaffSession, id: string) => Promise<CampaignAvailableDesignation>;
export declare const updateCampaignDesignations: (staffSession: StaffSession, campaignId: string, newDesignationIds: string[]) => Promise<{
    added: number;
    removed: number;
    total: number;
}>;
export {};
//# sourceMappingURL=campaignAvailableDesignation.service.d.ts.map