import { OrganizationPage } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
import { Transaction } from 'sequelize';
/**
 * A repository for handling all database operations for OrganizationPages
 * in the context of the CRM.
 */
export declare class CrmOrganizationPageRepository {
    private user;
    /**
     * Constructor accepts a StaffSession object to establish the security context.
     * @param user - The authenticated staff member's session data
     */
    constructor(user?: StaffSession | null);
    /**
     * Creates a new OrganizationPage.
     * Must automatically inject the organizationId from the user session.
     * @param pageData - The data for the new organization page
     */
    create(pageData: {
        pageType: string;
        contentConfig?: object;
    }): Promise<OrganizationPage>;
    /**
     * Fetches a single OrganizationPage.
     * The WHERE clause must check for both the id AND the organizationId from the user session to ensure tenancy.
     * @param id - The organization page ID
     */
    findById(id: string): Promise<OrganizationPage | null>;
    /**
     * Fetches a single OrganizationPage by page type.
     * The WHERE clause must check for both the pageType AND the organizationId from the user session to ensure tenancy.
     * @param pageType - The page type
     */
    findByPageType(pageType: string): Promise<OrganizationPage | null>;
    /**
     * Fetches all organization pages.
     * The WHERE clause must be scoped to the organizationId from the user session.
     */
    findAllForOrg(): Promise<OrganizationPage[]>;
    /**
     * Updates an organization page.
     * Must first find the page using both id and organizationId to ensure the user has permission to edit it.
     * @param id - The organization page ID
     * @param updateData - The data to update
     * @param transaction - Optional transaction to use for the operation
     */
    update(id: string, updateData: {
        pageType?: string;
        contentConfig?: object;
        isPublished?: boolean;
    }, transaction?: Transaction): Promise<OrganizationPage>;
    /**
     * Deletes an organization page.
     * Must first find the page using both id and organizationId.
     * @param id - The organization page ID
     */
    delete(id: string): Promise<void>;
    /**
     * Confirms image uploads by updating their status from 'pending' to 'confirmed'.
     * This prevents the cleanup job from deleting these images.
     * @param imageUrls - Array of image URLs to confirm
     * @param transaction - Optional transaction to use for the operation
     */
    confirmImages(imageUrls: string[], transaction?: Transaction): Promise<void>;
}
//# sourceMappingURL=organizationPage.repository.d.ts.map