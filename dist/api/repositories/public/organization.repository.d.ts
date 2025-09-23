/**
 * A repository for handling public-facing organization data.
 * This repository only returns safe, non-sensitive information.
 */
export declare class PublicOrganizationRepository {
    /**
     * Finds an organization by subdomain and returns only public information.
     * @param subdomain - The organization's subdomain
     * @returns Public organization data or null if not found
     */
    findBySubdomain(subdomain: string): Promise<{
        id: string;
        name: string;
        subdomain: string;
    } | null>;
    /**
     * Finds an organization by ID and returns only public information.
     * @param id - The organization's ID
     * @returns Public organization data or null if not found
     */
    findById(id: string): Promise<{
        id: string;
        name: string;
        subdomain: string;
    } | null>;
}
//# sourceMappingURL=organization.repository.d.ts.map