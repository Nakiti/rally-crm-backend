import { PublicDonorRepository } from '../../repositories/public/donor.repository.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { DonorSession } from '../../types/express.types.js';

// Public-safe DTO interfaces for donation history
interface PublicDonationDTO {
  id: string;
  amount: number;
  status: string;
  stripeChargeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  campaign: {
    id: string;
    externalName: string | null;
    slug: string;
    goalAmount: number | null;
    icon: string | null;
    isActive: boolean;
  } | null;
  designation: {
    id: string;
    name: string;
    description: string | null;
    goalAmount: number | null;
    isArchived: boolean;
  } | null;
}

/**
 * Service for handling public-facing donor operations.
 * This service ensures all data is transformed into public-safe DTOs.
 */
export class PublicDonorService {
  /**
   * Gets donation history for an authenticated donor, transforming data into public-safe DTOs
   * @param donorSession - The authenticated donor's session context
   * @returns Promise<PublicDonationDTO[]> - Array of public-safe donation data
   */
  public async getDonationHistoryForDonor(donorSession: DonorSession): Promise<PublicDonationDTO[]> {
    try {
      // Instantiate the PublicDonorRepository with the donorSession
      const donorRepo = new PublicDonorRepository(donorSession);
      
      // Call the findDonationHistory method
      const donationHistory = await donorRepo.findDonationHistory();
      
      // Business Logic: Transform the full Sequelize models into public-safe DTOs
      // Remove sensitive or internal IDs and fields that shouldn't be exposed
      const publicDonationHistory: PublicDonationDTO[] = donationHistory.map(donation => ({
        id: donation.id,
        amount: donation.amount,
        status: donation.status,
        stripeChargeId: donation.stripeChargeId, // Keep for receipt purposes
        createdAt: donation.createdAt,
        updatedAt: donation.updatedAt,
        campaign: donation.campaign ? {
          // Remove internalName (internal field) and keep only public fields
          id: donation.campaign.id,
          externalName: donation.campaign.externalName, // Public-facing name
          slug: donation.campaign.slug,
          goalAmount: donation.campaign.goalAmount,
          icon: donation.campaign.icon,
          isActive: donation.campaign.isActive,
        } : null,
        designation: donation.designation ? {
          id: donation.designation.id,
          name: donation.designation.name,
          description: donation.designation.description,
          goalAmount: donation.designation.goalAmount,
          isArchived: donation.designation.isArchived,
        } : null,
      }));

      return publicDonationHistory;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch donation history');
    }
  }
}

// Export convenience function for direct use
const publicDonorService = new PublicDonorService();

export const getDonationHistoryForDonor = (donorSession: DonorSession) => 
  publicDonorService.getDonationHistoryForDonor(donorSession);
