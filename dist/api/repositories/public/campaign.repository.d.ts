import { Campaign } from '../../../models/index.js';
/**
 * A repository for handling public campaign operations.
 * This repository is used for public-facing campaign functionality
 * where campaigns are accessed by subdomain context.
 */
export declare class PublicCampaignRepository {
    private subdomain;
    /**
     * Constructor accepts a subdomain string to establish the context.
     * @param subdomain - The organization's subdomain for tenancy
     */
    constructor(subdomain: string);
    /**
     * Finds a campaign by slug.
     * This is the primary method that finds a campaign where:
     * - The slug matches the provided slug
     * - The campaign isActive is true
     * - The organization's subdomain matches the one provided to the constructor (tenancy check)
     * @param slug - The campaign slug to search for
     * @returns Promise<Campaign | null> - The found campaign or null if not found
     */
    findBySlug(slug: string): Promise<Campaign | null>;
}
//# sourceMappingURL=campaign.repository.d.ts.map