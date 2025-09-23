import { Organization } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
interface CreateOrganizationData {
    name: string;
    subdomain: string;
    stripeAccountId?: string;
    settings?: object;
}
interface UpdateOrganizationData {
    name?: string;
    subdomain?: string;
    stripeAccountId?: string;
    settings?: object;
}
/**
 * Create a new organization
 */
export declare const createOrganization: (data: CreateOrganizationData) => Promise<Organization>;
/**
 * Update organization by ID with authorization check
 * @param id - Organization ID to update
 * @param data - Update data
 * @param staffUser - The authenticated staff user for authorization
 */
export declare const updateOrganization: (id: string, data: UpdateOrganizationData, staffUser: StaffSession) => Promise<Organization>;
/**
 * Delete organization by ID with authorization check
 * @param id - Organization ID to delete
 * @param staffUser - The authenticated staff user for authorization
 */
export declare const deleteOrganization: (id: string, staffUser: StaffSession) => Promise<void>;
/**
 * Get organization by ID with authorization check
 * @param id - Organization ID to fetch
 * @param staffUser - The authenticated staff user for authorization
 */
export declare const getOrganizationById: (id: string, staffUser: StaffSession) => Promise<Organization>;
/**
 * Get all organizations (admin only)
 * Note: This method doesn't require user context as it's typically used in admin scenarios
 */
export declare const getAllOrganizations: () => Promise<Organization[]>;
export {};
//# sourceMappingURL=organization.service.d.ts.map