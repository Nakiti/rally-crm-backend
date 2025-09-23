import { Designation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * A repository for handling all database operations for Designations
 * in the context of the CRM. All operations are scoped to the staff member's organization.
 */
export class CrmDesignationRepository {
    user;
    constructor(user) {
        this.user = user;
    }
    /**
     * Creates a new designation within the organization scope
     * @param designationData - The designation data
     * @returns The created Designation
     */
    async create(designationData) {
        try {
            // Automatically inject the organizationId from the StaffSession
            const designation = await Designation.create({
                organizationId: this.user.organizationId,
                name: designationData.name,
                description: designationData.description || '',
                goalAmount: designationData.goalAmount || 0,
                isArchived: false, // New designations are not archived by default
            });
            return designation;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to create designation in database.');
        }
    }
    /**
     * Fetches all designations for the organization
     * @returns Array of active designations (not archived)
     */
    async findAllForOrg() {
        try {
            const designations = await Designation.findAll({
                where: {
                    organizationId: this.user.organizationId,
                    isArchived: false, // Filter for non-archived designations by default
                },
                order: [['createdAt', 'DESC']], // Most recent first
            });
            return designations;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch designations from database.');
        }
    }
    /**
     * Fetches a single designation by ID within the organization scope
     * @param id - The designation ID
     * @returns The designation or null if not found
     */
    async findByIdForOrg(id) {
        try {
            const designation = await Designation.findOne({
                where: {
                    id: id,
                    organizationId: this.user.organizationId, // Ensure tenancy
                },
            });
            return designation;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch designation from database.');
        }
    }
    /**
     * Updates a designation within the organization scope
     * @param id - The designation ID
     * @param updateData - The data to update
     * @returns The updated Designation
     */
    async update(id, updateData) {
        try {
            // First find the designation using tenancy checks
            const designation = await this.findByIdForOrg(id);
            if (!designation) {
                throw new ApiError(404, 'Designation not found.');
            }
            // Update the designation
            await designation.update(updateData);
            return designation;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to update designation in database.');
        }
    }
    /**
     * Archives a designation (soft delete) within the organization scope
     * @param id - The designation ID
     * @returns The archived Designation
     */
    async archive(id) {
        try {
            // First find the designation using tenancy checks
            const designation = await this.findByIdForOrg(id);
            if (!designation) {
                throw new ApiError(404, 'Designation not found.');
            }
            // Update the isArchived status to true
            await designation.update({ isArchived: true });
            return designation;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to archive designation in database.');
        }
    }
}
//# sourceMappingURL=designation.repository.js.map