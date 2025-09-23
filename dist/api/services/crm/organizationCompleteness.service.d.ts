/**
 * Service for checking organization completeness and setting public status
 */
export declare class OrganizationCompletenessService {
    /**
     * Check and set organization public status based on completeness criteria
     * @param organizationId - The organization ID to check
     * @returns Promise<boolean> - The new isPubliclyActive status
     */
    static checkAndSetOrganizationPublicStatus(organizationId: string): Promise<boolean>;
    /**
     * Check if Stripe account is verified
     * @param stripeAccountId - The Stripe account ID
     * @returns Promise<boolean> - Whether the Stripe account is verified
     */
    private static checkStripeAccountVerification;
    /**
     * Check if all required organization pages are published
     * @param pages - Array of organization pages
     * @returns Promise<boolean> - Whether all required pages are published
     */
    private static checkRequiredPagesPublished;
    /**
     * Check if organization has an active subscription
     * @param organizationId - The organization ID
     * @returns Promise<boolean> - Whether the organization has an active subscription
     */
    private static checkActiveSubscription;
    /**
     * Get organization completeness status details
     * @param organizationId - The organization ID to check
     * @returns Promise<object> - Detailed completeness status
     */
    static getOrganizationCompletenessStatus(organizationId: string): Promise<{
        isPubliclyActive: boolean;
        stripeAccountVerified: boolean;
        requiredPagesPublished: boolean;
        hasActiveSubscription: boolean;
        missingRequirements: string[];
    }>;
}
//# sourceMappingURL=organizationCompleteness.service.d.ts.map