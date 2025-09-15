import { Designation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { CrmDesignationRepository } from '../../repositories/crm/designation.repository.js';
import type { StaffSession } from '../../types/express.types.js';

// Interface for designation creation data
interface CreateDesignationData {
  name: string;
  description?: string;
  goalAmount?: number;
}

// Interface for designation update data
interface UpdateDesignationData {
  name?: string;
  description?: string;
  goalAmount?: number;
}

/**
 * Service for handling CRM designation management operations.
 * These operations require authentication and organization context.
 */
export class CrmDesignationService {
  /**
   * Create a new designation
   * @param staffSession - The authenticated staff session
   * @param data - The designation data
   * @returns The created designation
   */
  public async createDesignation(staffSession: StaffSession, data: CreateDesignationData): Promise<Designation> {
    try {
      // Instantiate the CrmDesignationRepository with staffSession
      const designationRepo = new CrmDesignationRepository(staffSession);
      
      // Call the repository's create method
      const designation = await designationRepo.create(data);
      
      return designation;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create designation');
    }
  }

  /**
   * Get all designations for the organization
   * @param staffSession - The authenticated staff session
   * @returns Array of designations
   */
  public async getDesignations(staffSession: StaffSession): Promise<Designation[]> {
    try {
      // Instantiate the repository with staffSession
      const designationRepo = new CrmDesignationRepository(staffSession);
      
      // Call findAllForOrg
      const designations = await designationRepo.findAllForOrg();
      
      return designations;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch designations');
    }
  }

  /**
   * Update a designation
   * @param staffSession - The authenticated staff session
   * @param id - The designation ID
   * @param data - The update data
   * @returns The updated designation
   */
  public async updateDesignation(staffSession: StaffSession, id: string, data: UpdateDesignationData): Promise<Designation> {
    try {
      // Instantiate the repository with staffSession
      const designationRepo = new CrmDesignationRepository(staffSession);
      
      // Call the repository's update method
      const designation = await designationRepo.update(id, data);
      
      return designation;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to update designation');
    }
  }

  /**
   * Archive a designation (soft delete)
   * @param staffSession - The authenticated staff session
   * @param id - The designation ID
   * @returns The archived designation
   */
  public async archiveDesignation(staffSession: StaffSession, id: string): Promise<Designation> {
    try {
      // Instantiate the repository with staffSession
      const designationRepo = new CrmDesignationRepository(staffSession);
      
      // Call the repository's archive method
      const designation = await designationRepo.archive(id);
      
      return designation;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to archive designation');
    }
  }
}

// Export convenience functions for direct use
const crmDesignationService = new CrmDesignationService();

export const createDesignation = (staffSession: StaffSession, data: CreateDesignationData) =>
  crmDesignationService.createDesignation(staffSession, data);

export const getDesignations = (staffSession: StaffSession) =>
  crmDesignationService.getDesignations(staffSession);

export const updateDesignation = (staffSession: StaffSession, id: string, data: UpdateDesignationData) =>
  crmDesignationService.updateDesignation(staffSession, id, data);

export const archiveDesignation = (staffSession: StaffSession, id: string) =>
  crmDesignationService.archiveDesignation(staffSession, id);
