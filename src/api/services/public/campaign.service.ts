import { Campaign, Donation, DonorAccount, DonationAnswer } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { PublicCampaignRepository } from '../../repositories/public/campaign.repository.js';
import { PublicDonationRepository } from '../../repositories/public/donation.repository.js';
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
   * Creates a donation for a campaign with complex transactional workflow
   * @param subdomain - The organization's subdomain for tenancy
   * @param slug - The campaign slug
   * @param donationData - The donation data including donor info and answers
   * @returns Promise<string> - Success message
   */
  public async createDonationForCampaign(
    subdomain: string, 
    slug: string, 
    donationData: DonationData
  ): Promise<string> {
    return await sequelize.transaction(async (t) => {
      // Instantiate repositories
      const campaignRepo = new PublicCampaignRepository(subdomain);
      const donationRepo = new PublicDonationRepository();

      // Verify the campaign's existence and active status
      const campaign = await campaignRepo.findBySlug(slug);
      
      if (!campaign || !campaign.isActive) {
        throw new ApiError(404, 'Campaign not found or not active');
      }

      // TODO: Integrate Stripe payment processing
      // Create comments and empty funcs where stripe will be later integrated
      const stripeChargeId = await this.processStripePayment(donationData.amount);
      if (!stripeChargeId) {
        throw new ApiError(400, 'Payment processing failed');
      }

      // Use DonorAccount.findOrCreate to get a donor record, scoping by email and organizationId
      const [donorAccount, created] = await DonorAccount.findOrCreate({
        where: {
          email: donationData.donor.email,
          organizationId: campaign.organizationId
        },
        defaults: {
          organizationId: campaign.organizationId,
          firstName: donationData.donor.firstName,
          lastName: donationData.donor.lastName,
          email: donationData.donor.email,
          passwordHash: 'guest_account' // Default for public donations
        },
        transaction: t
      });

      // Call the create method on PublicDonationRepository
      const donation = await donationRepo.create({
        organizationId: campaign.organizationId,
        campaignId: campaign.id,
        donorAccountId: donorAccount.id,
        designationId: donationData.designationId,
        amount: donationData.amount,
        stripeChargeId: stripeChargeId,
        status: 'completed'
      }, t);

      // If donationData.answers exists, format the data and use DonationAnswer.bulkCreate
      if (donationData.answers && donationData.answers.length > 0) {
        const donationAnswers = donationData.answers.map(answer => ({
          donationId: donation.id,
          questionId: answer.questionId,
          answerValue: answer.answerValue
        }));

        await DonationAnswer.bulkCreate(donationAnswers, { transaction: t });
      }

      return 'Donation created successfully';
    });
  }

  /**
   * Placeholder for Stripe payment processing
   * @param amount - The donation amount
   * @returns Promise<string> - Stripe charge ID
   */
  private async processStripePayment(amount: number): Promise<string> {
    // TODO: Implement actual Stripe payment processing
    // This is where Stripe integration will be added
    // For now, return a placeholder charge ID
    return `ch_placeholder_${Date.now()}`;
  }
}
