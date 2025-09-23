import { Designation } from '../../../models/index.js';
import type { StaffSession } from '../../types/express.types.js';
interface CreateDesignationData {
    name: string;
    description?: string;
    goalAmount?: number;
}
interface UpdateDesignationData {
    name?: string;
    description?: string;
    goalAmount?: number;
}
/**
 * Service for handling CRM designation management operations.
 * These operations require authentication and organization context.
 */
export declare class CrmDesignationService {
    /**
     * Create a new designation
     * @param staffSession - The authenticated staff session
     * @param data - The designation data
     * @returns The created designation
     */
    createDesignation(staffSession: StaffSession, data: CreateDesignationData): Promise<Designation>;
    /**
     * Get all designations for the organization
     * @param staffSession - The authenticated staff session
     * @returns Array of designations
     */
    getDesignations(staffSession: StaffSession): Promise<Designation[]>;
    /**
     * Update a designation
     * @param staffSession - The authenticated staff session
     * @param id - The designation ID
     * @param data - The update data
     * @returns The updated designation
     */
    updateDesignation(staffSession: StaffSession, id: string, data: UpdateDesignationData): Promise<Designation>;
    /**
     * Archive a designation (soft delete)
     * @param staffSession - The authenticated staff session
     * @param id - The designation ID
     * @returns The archived designation
     */
    archiveDesignation(staffSession: StaffSession, id: string): Promise<Designation>;
}
export declare const createDesignation: (staffSession: StaffSession, data: CreateDesignationData) => Promise<Designation>;
export declare const getDesignations: (staffSession: StaffSession) => Promise<Designation[]>;
export declare const updateDesignation: (staffSession: StaffSession, id: string, data: UpdateDesignationData) => Promise<Designation>;
export declare const archiveDesignation: (staffSession: StaffSession, id: string) => Promise<Designation>;
export {};
//# sourceMappingURL=designation.service.d.ts.map