import { ApiError } from '../../../utils/ApiError.js';
import { CrmDesignationRepository } from '../../repositories/crm/designation.repository.js';
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
    async createDesignation(staffSession, data) {
        try {
            // Instantiate the CrmDesignationRepository with staffSession
            const designationRepo = new CrmDesignationRepository(staffSession);
            // Call the repository's create method
            const designation = await designationRepo.create(data);
            return designation;
        }
        catch (error) {
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
    async getDesignations(staffSession) {
        try {
            // Instantiate the repository with staffSession
            const designationRepo = new CrmDesignationRepository(staffSession);
            // Call findAllForOrg
            const designations = await designationRepo.findAllForOrg();
            return designations;
        }
        catch (error) {
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
    async updateDesignation(staffSession, id, data) {
        try {
            // Instantiate the repository with staffSession
            const designationRepo = new CrmDesignationRepository(staffSession);
            // Call the repository's update method
            const designation = await designationRepo.update(id, data);
            return designation;
        }
        catch (error) {
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
    async archiveDesignation(staffSession, id) {
        try {
            // Instantiate the repository with staffSession
            const designationRepo = new CrmDesignationRepository(staffSession);
            // Call the repository's archive method
            const designation = await designationRepo.archive(id);
            return designation;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to archive designation');
        }
    }
}
// Export convenience functions for direct use
const crmDesignationService = new CrmDesignationService();
export const createDesignation = (staffSession, data) => crmDesignationService.createDesignation(staffSession, data);
export const getDesignations = (staffSession) => crmDesignationService.getDesignations(staffSession);
export const updateDesignation = (staffSession, id, data) => crmDesignationService.updateDesignation(staffSession, id, data);
export const archiveDesignation = (staffSession, id) => crmDesignationService.archiveDesignation(staffSession, id);
//# sourceMappingURL=designation.service.js.map