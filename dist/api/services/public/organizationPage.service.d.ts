/**
 * Service for handling public-facing organization page operations.
 * This service only returns safe, non-sensitive information.
 */
export declare class PublicOrganizationPageService {
    private repository;
    constructor();
    /**
     * Get organization page by organization ID and page type (public information only)
     * @param organizationId - The organization's ID
     * @param pageType - The page type
     * @returns Public organization page data
     */
    getOrganizationPageByType(organizationId: string, pageType: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get organization page by organization subdomain and page type (public information only)
     * @param subdomain - The organization's subdomain
     * @param pageType - The page type
     * @returns Public organization page data
     */
    getOrganizationPageBySubdomainAndType(subdomain: string, pageType: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    }>;
    /**
     * Get all organization pages for an organization by ID (public information only)
     * @param organizationId - The organization's ID
     * @returns Array of public organization page data
     */
    getOrganizationPages(organizationId: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    }[]>;
    /**
     * Get all organization pages for an organization by subdomain (public information only)
     * @param subdomain - The organization's subdomain
     * @returns Array of public organization page data
     */
    getOrganizationPagesBySubdomain(subdomain: string): Promise<{
        id: string;
        organizationId: string;
        pageType: string;
        contentConfig: object | null;
        createdAt: string;
        updatedAt: string;
    }[]>;
}
export declare const getOrganizationPageByType: (organizationId: string, pageType: string) => Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
}>;
export declare const getOrganizationPageBySubdomainAndType: (subdomain: string, pageType: string) => Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
}>;
export declare const getOrganizationPages: (organizationId: string) => Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
}[]>;
export declare const getOrganizationPagesBySubdomain: (subdomain: string) => Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
}[]>;
//# sourceMappingURL=organizationPage.service.d.ts.map