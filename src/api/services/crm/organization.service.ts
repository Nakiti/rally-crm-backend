import { Organization } from '../../../models';
import { ApiError } from "../../../utils/ApiError"
import { CrmOrganizationRepository } from '../../repositories/crm/organization.repository';
import { StaffUser } from '../../../models';

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
export const createOrganization = async (data: CreateOrganizationData): Promise<Organization> => {
    try {
        // Create repository instance without user context for creation
        const orgRepo = new CrmOrganizationRepository();
        

        // Use repository to create organization
        const organization = await orgRepo.create(data);
        return organization;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to create organization');
    }
};


/**
 * Service to securely fetch the organization details for the currently authenticated staff member.
 * @param staffUser - The authenticated user object provided by the middleware.
 */
export const getOrganizationForStaff = async (staffUser: StaffUser): Promise<Organization> => {
  // 1. --- DATA ACCESS ---
  // Instantiate the repository WITH the user's security context.
  const orgRepo = new CrmOrganizationRepository(staffUser);

  // 2. --- FETCH DATA ---
  // Call the secure repository method. The repository handles the tenancy check.
  const organization = await orgRepo.findByAuthenticatedStaff();

  if (!organization) {
    // This case should be rare if the JWT is valid, but it's a good safeguard.
    throw new ApiError(404, 'Associated organization not found.');
  }

  // 3. --- RETURN ---
  return organization;
};

/**
 * Update organization by ID with authorization check
 * @param id - Organization ID to update
 * @param data - Update data
 * @param staffUser - The authenticated staff user for authorization
 */
export const updateOrganization = async (
    id: string, 
    data: UpdateOrganizationData, 
    staffUser: StaffUser
): Promise<Organization> => {
    try {
        // Create repository instance with user context for authorization
        const orgRepo = new CrmOrganizationRepository(staffUser);
        
        // Use repository to update organization (includes authorization check)
        const organization = await orgRepo.update(id, data);
        return organization;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to update organization');
    }
};

/**
 * Delete organization by ID with authorization check
 * @param id - Organization ID to delete
 * @param staffUser - The authenticated staff user for authorization
 */
export const deleteOrganization = async (id: string, staffUser: StaffUser): Promise<void> => {
    try {
        // Create repository instance with user context for authorization
        const orgRepo = new CrmOrganizationRepository(staffUser);
        
        // Use repository to delete organization (includes authorization check)
        await orgRepo.delete(id);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to delete organization');
    }
};

/**
 * Get organization by ID with authorization check
 * @param id - Organization ID to fetch
 * @param staffUser - The authenticated staff user for authorization
 */
export const getOrganizationById = async (id: string, staffUser: StaffUser): Promise<Organization> => {
    try {
        // Create repository instance with user context for authorization
        const orgRepo = new CrmOrganizationRepository(staffUser);
        
        // Use repository to get organization (includes authorization check)
        const organization = await orgRepo.findById(id);
        
        if (!organization) {
            throw new ApiError(404, 'Organization not found');
        }
        
        return organization;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch organization');
    }
};

/**
 * Get all organizations (admin only)
 * Note: This method doesn't require user context as it's typically used in admin scenarios
 */
export const getAllOrganizations = async (): Promise<Organization[]> => {
    try {
        // Create repository instance without user context for admin access
        const orgRepo = new CrmOrganizationRepository();
        
        // Use repository to get all organizations
        const organizations = await orgRepo.findAll();
        return organizations;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch organizations');
    }
};


