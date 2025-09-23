import { DonorAccount } from '../../../models/index.js';
import type { StaffSession } from '../../types/express.types.js';
interface DonorFilters {
    name?: string;
    email?: string;
    page?: number;
    limit?: number;
}
/**
 * Get all donors for the organization with optional filtering and pagination
 * @param staffSession - The authenticated staff session
 * @param filters - Optional filters for name, email, page, and limit
 * @returns Promise with paginated donor accounts
 */
export declare const getDonorsForOrg: (staffSession: StaffSession, filters?: DonorFilters) => Promise<{
    donors: DonorAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
/**
 * Get a single donor profile by ID with their complete donation history
 * @param donorId - The donor account ID
 * @param staffSession - The authenticated staff session
 * @returns Promise with the donor account and their donations
 */
export declare const getDonorProfile: (donorId: string, staffSession: StaffSession) => Promise<DonorAccount>;
export {};
//# sourceMappingURL=donor.service.d.ts.map