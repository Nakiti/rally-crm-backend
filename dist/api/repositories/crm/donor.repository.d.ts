import { DonorAccount } from '../../../models/index.js';
import type { StaffSession } from '../../types/express.types.js';
/**
 * A repository for handling all database operations for DonorAccounts
 * in the context of the CRM.
 */
export declare class CrmDonorRepository {
    private staffSession;
    /**
     * Constructor that accepts a StaffSession object for security context.
     * @param staffSession - The authenticated staff session containing organization context
     */
    constructor(staffSession: StaffSession);
    /**
     * Fetches a paginated list of all DonorAccounts scoped to the staffSession.organizationId.
     * Allows filtering by name or email.
     * @param filters - Optional filters for name, email, page, and limit
     * @returns Promise with paginated donor accounts
     */
    findAllForOrg(filters?: {
        name?: string;
        email?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        donors: DonorAccount[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Fetches a single DonorAccount by its ID.
     * The WHERE clause checks for both the id and the staffSession.organizationId.
     * Eager loads the donor's associated Donations to build their complete giving history.
     * @param id - The ID of the donor account to fetch
     * @returns Promise with the donor account and their donations
     */
    findByIdForOrg(id: string): Promise<DonorAccount | null>;
}
//# sourceMappingURL=donor.repository.d.ts.map