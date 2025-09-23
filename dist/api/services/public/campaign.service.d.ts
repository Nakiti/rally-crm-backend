interface PublicCampaignDTO {
    externalName?: string;
    slug: string;
    goalAmount?: number;
    icon?: string;
    pageConfig?: object;
}
interface DonationData {
    amount: number;
    designationId: string;
    donor: {
        firstName: string;
        lastName: string;
        email: string;
    };
    answers?: Array<{
        questionId: string;
        answerValue: string;
    }>;
}
/**
 * Public Campaign Service for handling public-facing campaign operations
 */
export declare class PublicCampaignService {
    /**
     * Gets a public campaign by slug, transforming it into a public-safe DTO
     * @param subdomain - The organization's subdomain for tenancy
     * @param slug - The campaign slug
     * @returns Promise<PublicCampaignDTO | null> - The public-safe campaign data or null if not found
     */
    getPublicCampaignBySlug(subdomain: string, slug: string): Promise<PublicCampaignDTO | null>;
    /**
     * Creates a Stripe checkout session for a campaign donation
     * @param subdomain - The organization's subdomain for tenancy
     * @param slug - The campaign slug
     * @param donationData - The donation data including donor info and answers
     * @returns Promise<{sessionId: string, successUrl: string, cancelUrl: string}> - Stripe session details
     */
    createDonationCheckoutSession(subdomain: string, slug: string, donationData: DonationData, successUrl: string, cancelUrl: string): Promise<{
        sessionId: string;
        successUrl: string;
        cancelUrl: string;
    }>;
}
export {};
//# sourceMappingURL=campaign.service.d.ts.map