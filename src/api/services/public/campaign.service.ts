import { Campaign, Donation, DonorAccount, DonationAnswer, Organization } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { PublicCampaignRepository } from '../../repositories/public/campaign.repository.js';
import { PublicDonationRepository } from '../../repositories/public/donation.repository.js';
import { StripeService } from '../crm/stripe.service.js';
import sequelize from '../../../config/database.js';

// Public-safe DTO interface for campaigns
interface PublicCampaignDTO {
  externalName?: string;
  slug: string;
  goalAmount?: number;
  icon?: string;
  pageConfig?: object;
}

// Donation data interface
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
export class PublicCampaignService {
  /**
   * Gets a public campaign by slug, transforming it into a public-safe DTO
   * @param subdomain - The organization's subdomain for tenancy
   * @param slug - The campaign slug
   * @returns Promise<PublicCampaignDTO | null> - The public-safe campaign data or null if not found
   */
  public async getPublicCampaignBySlug(subdomain: string, slug: string): Promise<PublicCampaignDTO | null> {
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
      const publicCampaign: PublicCampaignDTO = {
        externalName: campaign.externalName,
        slug: campaign.slug,
        goalAmount: campaign.goalAmount,
        icon: campaign.icon,
        pageConfig: campaign.pageConfig
      };

      return publicCampaign;
    } catch (error) {
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
  public async createDonationCheckoutSession(
    subdomain: string, 
    slug: string, 
    donationData: DonationData,
    successUrl: string,
    cancelUrl: string
  ): Promise<{sessionId: string, successUrl: string, cancelUrl: string}> {
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
      const sessionId = await stripeService.createDonationCheckoutSession(
        donationData.amount,
        campaign.id,
        donationData.donor.email,
        `${donationData.donor.firstName} ${donationData.donor.lastName}`,
        campaign.organizationId,
        successUrl,
        cancelUrl
      );

      return {
        sessionId,
        successUrl,
        cancelUrl
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create checkout session');
    }
  }

}
