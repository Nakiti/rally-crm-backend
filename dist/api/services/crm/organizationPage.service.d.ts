import { OrganizationPage } from '../../../models/index.js';
import type { StaffSession } from '../../types/session.types.js';
interface CreateOrganizationPageData {
    pageType: string;
    contentConfig?: object;
}
interface UpdateOrganizationPageData {
    pageType?: string;
    contentConfig?: object;
    isPublished?: boolean;
}
/**
 * Create a new organization page for staff
 * @param pageData - The organization page data
 * @param staffSession - The authenticated staff session
 */
export declare const createOrganizationPageForStaff: (pageData: CreateOrganizationPageData, staffSession: StaffSession) => Promise<OrganizationPage>;
/**
 * Get all organization pages for the organization
 * @param staffSession - The authenticated staff session
 */
export declare const getOrganizationPagesForOrg: (staffSession: StaffSession) => Promise<OrganizationPage[]>;
/**
 * Get a single organization page by ID for staff
 * @param id - The organization page ID
 * @param staffSession - The authenticated staff session
 */
export declare const getOrganizationPageByIdForStaff: (id: string, staffSession: StaffSession) => Promise<OrganizationPage>;
/**
 * Get a single organization page by page type for staff
 * @param pageType - The page type
 * @param staffSession - The authenticated staff session
 */
export declare const getOrganizationPageByTypeForStaff: (pageType: string, staffSession: StaffSession) => Promise<OrganizationPage>;
/**
 * Update an organization page for staff
 * @param id - The organization page ID
 * @param updateData - The update data
 * @param staffSession - The authenticated staff session
 */
export declare const updateOrganizationPageForStaff: (id: string, updateData: UpdateOrganizationPageData, staffSession: StaffSession) => Promise<OrganizationPage>;
/**
 * Delete an organization page for staff
 * @param id - The organization page ID
 * @param staffSession - The authenticated staff session
 */
export declare const deleteOrganizationPageForStaff: (id: string, staffSession: StaffSession) => Promise<void>;
/**
 * Get organization page content configuration
 * @param id - The organization page ID
 * @param staffSession - The authenticated staff session
 */
export declare const getOrganizationPageContentConfig: (id: string, staffSession: StaffSession) => Promise<object | null>;
/**
 * Update organization page content configuration
 * @param id - The organization page ID
 * @param contentConfig - The new content configuration
 * @param staffSession - The authenticated staff session
 */
export declare const updateOrganizationPageContentConfig: (id: string, contentConfig: object, staffSession: StaffSession) => Promise<OrganizationPage>;
/**
 * Publish organization page - updates content config and sets is_published to true
 * @param pageSlug - The page slug (pageType)
 * @param contentConfig - The new content configuration
 * @param staffSession - The authenticated staff session
 */
export declare const publishOrganizationPage: (pageSlug: string, contentConfig: object, staffSession: StaffSession) => Promise<OrganizationPage>;
/**
 * Automatically create default organization pages for a new organization
 * This function is called during organization creation and doesn't require user authentication
 * @param organizationId - The ID of the organization to create pages for
 */
export declare const createDefaultOrganizationPages: (organizationId: string) => Promise<OrganizationPage[]>;
export {};
//# sourceMappingURL=organizationPage.service.d.ts.map