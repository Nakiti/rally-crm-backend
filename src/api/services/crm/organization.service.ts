import { Organization } from '../../../models/index.js';
import { ApiError } from "../../../utils/ApiError.js"
import { CrmOrganizationRepository } from '../../repositories/crm/organization.repository.js';
import type { StaffSession } from '../../types/session.types.js';
import { createDefaultOrganizationPages } from './organizationPage.service.js';

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
        
        // After successful organization creation, create default organization pages
        try {
            await createDefaultOrganizationPages(organization.id);
        } catch (pageError) {
            // Log the error but don't fail the organization creation
            // The organization was successfully created, pages can be created later
            console.error('Failed to create default organization pages:', pageError);
        }
        
        return organization;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to create organization');
    }
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
    staffUser: StaffSession
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
export const deleteOrganization = async (id: string, staffUser: StaffSession): Promise<void> => {
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
export const getOrganizationById = async (id: string, staffUser: StaffSession): Promise<Organization> => {
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


