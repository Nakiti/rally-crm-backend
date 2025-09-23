/**
 * Service for handling public-facing organization operations.
 * This service only returns safe, non-sensitive information.
 */
export declare class PublicOrganizationService {
    private repository;
    constructor();
    /**
     * Get organization by subdomain (public information only)
     * @param subdomain - The organization's subdomain
     * @returns Public organization data
     */
    getOrganizationBySubdomain(subdomain: string): Promise<{
        id: string;
        name: string;
        subdomain: string;
    }>;
    /**
     * Get organization by ID (public information only)
     * @param id - The organization's ID
     * @returns Public organization data
     */
    getOrganizationById(id: string): Promise<{
        id: string;
        name: string;
        subdomain: string;
    }>;
}
export declare const getOrganizationBySubdomain: (subdomain: string) => Promise<{
    id: string;
    name: string;
    subdomain: string;
}>;
export declare const getOrganizationById: (id: string) => Promise<{
    id: string;
    name: string;
    subdomain: string;
}>;
//# sourceMappingURL=organization.service.d.ts.map