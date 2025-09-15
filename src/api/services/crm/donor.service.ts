import { DonorAccount } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { CrmDonorRepository } from '../../repositories/crm/donor.repository.js';
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
export const getDonorsForOrg = async (
  staffSession: StaffSession,
  filters: DonorFilters = {}
): Promise<{
  donors: DonorAccount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  try {
    // Create repository instance with staff session for authorization
    const donorRepo = new CrmDonorRepository(staffSession);
    
    // Use repository to get all donors for the organization with filters
    const result = await donorRepo.findAllForOrg(filters);
    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch donors');
  }
};

/**
 * Get a single donor profile by ID with their complete donation history
 * @param donorId - The donor account ID
 * @param staffSession - The authenticated staff session
 * @returns Promise with the donor account and their donations
 */
export const getDonorProfile = async (
  donorId: string,
  staffSession: StaffSession
): Promise<DonorAccount> => {
  try {
    // Create repository instance with staff session for authorization
    const donorRepo = new CrmDonorRepository(staffSession);
    
    // Use repository to get donor by ID (includes authorization check and eager loading of donations)
    const donor = await donorRepo.findByIdForOrg(donorId);
    
    if (!donor) {
      throw new ApiError(404, 'Donor not found');
    }
    
    return donor;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch donor profile');
  }
};
