import { Organization } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
/**
 * A repository for handling all database operations for Organizations
 * in the context of the CRM.
 */
export declare class CrmOrganizationRepository {
    private user;
    constructor(user?: StaffSession | null);
    /**
     * Creates a new organization.
     * @param organizationData - The data for the new organization.
     */
    create(organizationData: {
        name: string;
        subdomain: string;
        stripeAccountId?: string;
        settings?: object;
    }): Promise<Organization>;
    /**
     * Finds an organization by ID with authorization check.
     * Only allows access to the organization the authenticated staff member belongs to.
     */
    findById(id: string): Promise<Organization | null>;
    /**
     * Updates an organization with authorization check.
     * Only allows updating the organization the authenticated staff member belongs to.
     */
    update(id: string, updateData: {
        name?: string;
        subdomain?: string;
        stripeAccountId?: string;
        settings?: object;
    }): Promise<Organization>;
    /**
     * Deletes an organization with authorization check.
     * Only allows deleting the organization the authenticated staff member belongs to.
     */
    delete(id: string): Promise<void>;
    /**
     * Finds all organizations (admin only - no authorization check needed for creation context).
     * This method doesn't require user context as it's typically used in admin scenarios.
     */
    findAll(): Promise<Organization[]>;
}
//# sourceMappingURL=organization.repository.d.ts.map