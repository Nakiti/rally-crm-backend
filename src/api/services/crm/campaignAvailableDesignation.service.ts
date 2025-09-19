import { CampaignAvailableDesignation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { CrmCampaignAvailableDesignationRepository } from '../../repositories/crm/campaignAvailableDesignation.repository.js';
import type { StaffSession } from '../../types/session.types.js';

// Interface for campaign available designation creation data
interface CreateCampaignAvailableDesignationData {
  campaignId: string;
  designationId: string;
}

/**
 * Service for handling CRM campaign available designation management operations.
 * These operations require authentication and organization context.
 */
export class CrmCampaignAvailableDesignationService {
  /**
   * Create a new campaign available designation
   * @param staffSession - The authenticated staff session
   * @param data - The campaign available designation data
   * @returns The created campaign available designation
   */
  public async createCampaignAvailableDesignation(
    staffSession: StaffSession, 
    data: CreateCampaignAvailableDesignationData
  ): Promise<CampaignAvailableDesignation> {
    try {
      // Instantiate the CrmCampaignAvailableDesignationRepository with staffSession
      const campaignAvailableDesignationRepo = new CrmCampaignAvailableDesignationRepository(staffSession);
      
      // Call the repository's create method
      const campaignAvailableDesignation = await campaignAvailableDesignationRepo.create(data);
      
      return campaignAvailableDesignation;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create campaign available designation');
    }
  }

  /**
   * Get all campaign available designations for a specific campaign
   * @param staffSession - The authenticated staff session
   * @param campaignId - The campaign ID
   * @returns Array of campaign available designations
   */
  public async getCampaignAvailableDesignations(
    staffSession: StaffSession, 
    campaignId: string
  ): Promise<CampaignAvailableDesignation[]> {
    try {
      // Instantiate the repository with staffSession
      const campaignAvailableDesignationRepo = new CrmCampaignAvailableDesignationRepository(staffSession);
      
      // Call findAllForCampaign
      const campaignAvailableDesignations = await campaignAvailableDesignationRepo.findAllForCampaign(campaignId);
      
      return campaignAvailableDesignations;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch campaign available designations');
    }
  }

  /**
   * Get a specific campaign available designation by ID
   * @param staffSession - The authenticated staff session
   * @param id - The campaign available designation ID
   * @returns The campaign available designation
   */
  public async getCampaignAvailableDesignation(
    staffSession: StaffSession, 
    id: string
  ): Promise<CampaignAvailableDesignation> {
    try {
      // Instantiate the repository with staffSession
      const campaignAvailableDesignationRepo = new CrmCampaignAvailableDesignationRepository(staffSession);
      
      // Call findByIdForOrg
      const campaignAvailableDesignation = await campaignAvailableDesignationRepo.findByIdForOrg(id);
      
      if (!campaignAvailableDesignation) {
        throw new ApiError(404, 'Campaign available designation not found');
      }
      
      return campaignAvailableDesignation;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch campaign available designation');
    }
  }

  /**
   * Delete a campaign available designation
   * @param staffSession - The authenticated staff session
   * @param id - The campaign available designation ID
   * @returns The deleted campaign available designation
   */
  public async deleteCampaignAvailableDesignation(
    staffSession: StaffSession, 
    id: string
  ): Promise<CampaignAvailableDesignation> {
    try {
      // Instantiate the repository with staffSession
      const campaignAvailableDesignationRepo = new CrmCampaignAvailableDesignationRepository(staffSession);
      
      // Call the repository's delete method
      const campaignAvailableDesignation = await campaignAvailableDesignationRepo.delete(id);
      
      return campaignAvailableDesignation;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete campaign available designation');
    }
  }

  /**
   * Update campaign designations by comparing current vs new and performing bulk operations
   * @param staffSession - The authenticated staff session
   * @param campaignId - The campaign ID
   * @param newDesignationIds - Array of new designation IDs
   * @returns Object with operation results
   */
  public async updateCampaignDesignations(
    staffSession: StaffSession, 
    campaignId: string, 
    newDesignationIds: string[]
  ): Promise<{
    added: number;
    removed: number;
    total: number;
  }> {
    try {
      // Instantiate the repository with staffSession
      const campaignAvailableDesignationRepo = new CrmCampaignAvailableDesignationRepository(staffSession);
      
      // Get current designation IDs
      const currentDesignationIds = await campaignAvailableDesignationRepo.getCurrentDesignationIds(campaignId);
      
      // Calculate differences
      const currentSet = new Set(currentDesignationIds);
      const newSet = new Set(newDesignationIds);
      
      // Find IDs to add (in new but not in current)
      const idsToAdd = newDesignationIds.filter(id => !currentSet.has(id));
      
      // Find IDs to remove (in current but not in new)
      const idsToRemove = currentDesignationIds.filter(id => !newSet.has(id));
      
      // Perform bulk operations within a transaction
      const { sequelize } = await import('../../../models/index.js');
      const transaction = await sequelize.transaction();
      
      try {
        let addedCount = 0;
        let removedCount = 0;
        
        // Remove designations that are no longer needed
        if (idsToRemove.length > 0) {
          removedCount = await campaignAvailableDesignationRepo.bulkDeleteByDesignationIds(campaignId, idsToRemove);
        }
        
        // Add new designations
        if (idsToAdd.length > 0) {
          await campaignAvailableDesignationRepo.bulkCreate(campaignId, idsToAdd);
          addedCount = idsToAdd.length;
        }
        
        // Commit the transaction
        await transaction.commit();
        
        return {
          added: addedCount,
          removed: removedCount,
          total: newDesignationIds.length
        };
      } catch (error) {
        // Rollback the transaction on error
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to update campaign designations');
    }
  }
}

// Export convenience functions for direct use
const crmCampaignAvailableDesignationService = new CrmCampaignAvailableDesignationService();

export const createCampaignAvailableDesignation = (
  staffSession: StaffSession, 
  data: CreateCampaignAvailableDesignationData
) => crmCampaignAvailableDesignationService.createCampaignAvailableDesignation(staffSession, data);

export const getCampaignAvailableDesignations = (
  staffSession: StaffSession, 
  campaignId: string
) => crmCampaignAvailableDesignationService.getCampaignAvailableDesignations(staffSession, campaignId);

export const getCampaignAvailableDesignation = (
  staffSession: StaffSession, 
  id: string
) => crmCampaignAvailableDesignationService.getCampaignAvailableDesignation(staffSession, id);

export const deleteCampaignAvailableDesignation = (
  staffSession: StaffSession, 
  id: string
) => crmCampaignAvailableDesignationService.deleteCampaignAvailableDesignation(staffSession, id);

export const updateCampaignDesignations = (
  staffSession: StaffSession, 
  campaignId: string, 
  newDesignationIds: string[]
) => crmCampaignAvailableDesignationService.updateCampaignDesignations(staffSession, campaignId, newDesignationIds);