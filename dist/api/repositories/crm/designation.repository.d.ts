import { Designation } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
interface DesignationCreationData {
    name: string;
    description?: string;
    goalAmount?: number;
}
interface DesignationUpdateData {
    name?: string;
    description?: string;
    goalAmount?: number;
}
/**
 * A repository for handling all database operations for Designations
 * in the context of the CRM. All operations are scoped to the staff member's organization.
 */
export declare class CrmDesignationRepository {
    private user;
    constructor(user: StaffSession);
    /**
     * Creates a new designation within the organization scope
     * @param designationData - The designation data
     * @returns The created Designation
     */
    create(designationData: DesignationCreationData): Promise<Designation>;
    /**
     * Fetches all designations for the organization
     * @returns Array of active designations (not archived)
     */
    findAllForOrg(): Promise<Designation[]>;
    /**
     * Fetches a single designation by ID within the organization scope
     * @param id - The designation ID
     * @returns The designation or null if not found
     */
    findByIdForOrg(id: string): Promise<Designation | null>;
    /**
     * Updates a designation within the organization scope
     * @param id - The designation ID
     * @param updateData - The data to update
     * @returns The updated Designation
     */
    update(id: string, updateData: DesignationUpdateData): Promise<Designation>;
    /**
     * Archives a designation (soft delete) within the organization scope
     * @param id - The designation ID
     * @returns The archived Designation
     */
    archive(id: string): Promise<Designation>;
}
export {};
//# sourceMappingURL=designation.repository.d.ts.map