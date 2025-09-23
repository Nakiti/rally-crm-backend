/**
 * A repository for handling public-facing organization page data.
 * This repository only returns safe, non-sensitive information.
 */
export declare class PublicOrganizationPageRepository {
    /**
     * Finds an organization page by organization ID and page type.
     * Returns only public information.
     * @param organizationId - The organization's ID
     * @param pageType - The page type
     * @returns Public organization page data or null if not found
     */
    findByOrganizationIdAndType(organizationId: string, pageType: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    } | null>;
    /**
     * Finds an organization page by organization subdomain and page type.
     * Returns only public information.
     * @param subdomain - The organization's subdomain
     * @param pageType - The page type
     * @returns Public organization page data or null if not found
     */
    findBySubdomainAndType(subdomain: string, pageType: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    } | null>;
    /**
     * Finds all organization pages for a specific organization by ID.
     * Returns only public information.
     * @param organizationId - The organization's ID
     * @returns Array of public organization page data
     */
    findAllByOrganizationId(organizationId: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    }[]>;
    /**
     * Finds all organization pages for a specific organization by subdomain.
     * Returns only public information.
     * @param subdomain - The organization's subdomain
     * @returns Array of public organization page data
     */
    findAllBySubdomain(subdomain: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    }[]>;
}
//# sourceMappingURL=organizationPage.repository.d.ts.map