import { Organization } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { PublicCampaignRepository } from '../../repositories/public/campaign.repository.js';
import { StripeService } from '../crm/stripe.service.js';
/**
 * Public Campaign Service for handling public-facing campaign operations
 */
export class PublicCampaignService {
    /**
     * Gets a public campaign by slug, transforming it into a public-safe DTO
     * @param subdomain - The organization's subdomain for tenancy
     * @param slug - The campaign slug
     * @returns Promise<PublicCampaignDTO | null> - The public-safe campaign data or null if not found
     */
    async getPublicCampaignBySlug(subdomain, slug) {
        try {
            // Instantiate the PublicCampaignRepository
            const campaignRepo = new PublicCampaignRepository(subdomain);
            // Call findBySlug to get the campaign
            const campaign = await campaignRepo.findBySlug(slug);
            if (!campaign) {
                return null;
            }
            // Transform the full Sequelize Campaign model into a public-safe DTO
            // Remove sensitive/internal-only fields (id, organizationId, isActive, internalName)
            const publicCampaign = {
                externalName: campaign.externalName,
                slug: campaign.slug,
                goalAmount: campaign.goalAmount,
                icon: campaign.icon,
                pageConfig: campaign.pageConfig
            };
            return publicCampaign;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch public campaign');
        }
    }
    /**
     * Creates a Stripe checkout session for a campaign donation
     * @param subdomain - The organization's subdomain for tenancy
     * @param slug - The campaign slug
     * @param donationData - The donation data including donor info and answers
     * @returns Promise<{sessionId: string, successUrl: string, cancelUrl: string}> - Stripe session details
     */
    async createDonationCheckoutSession(subdomain, slug, donationData, successUrl, cancelUrl) {
        try {
            // Instantiate repositories
            const campaignRepo = new PublicCampaignRepository(subdomain);
            // Verify the campaign's existence and active status
            const campaign = await campaignRepo.findBySlug(slug);
            if (!campaign || !campaign.isActive) {
                throw new ApiError(404, 'Campaign not found or not active');
            }
            // Get organization to verify Stripe connection
            const organization = await Organization.findByPk(campaign.organizationId);
            if (!organization || !organization.stripeAccountId) {
                throw new ApiError(400, 'Organization not connected to Stripe');
            }
            // Create Stripe service instance
            const stripeService = new StripeService();
            // Create checkout session
            const sessionId = await stripeService.createDonationCheckoutSession(donationData.amount, campaign.id, donationData.donor.email, `${donationData.donor.firstName} ${donationData.donor.lastName}`, campaign.organizationId, successUrl, cancelUrl);
            return {
                sessionId,
                successUrl,
                cancelUrl
            };
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to create checkout session');
        }
    }
}
//# sourceMappingURL=campaign.service.js.map