import { ApiError } from '../../../utils/ApiError.js';
import { CrmDonationRepository } from '../../repositories/crm/donation.repository.js';
import type { StaffSession } from '../../types/express.types.js';

// Interface for pagination filters
interface PaginationFilters {
  page?: number;
  limit?: number;
  status?: string;
  campaignId?: string;
  designationId?: string;
  donorEmail?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// DTO for donation list item
interface DonationListItemDTO {
  id: string;
  amount: number;
  status: string;
  stripeChargeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  campaign: {
    id: string;
    internalName: string;
    externalName: string | null;
    slug: string;
    goalAmount: number | null;
    icon: string | null;
    isActive: boolean;
  } | null;
  donorAccount: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  designation: {
    id: string;
    name: string;
    description: string | null;
    goalAmount: number | null;
    isArchived: boolean;
  } | null;
}

// DTO for donation details
interface DonationDetailsDTO {
  id: string;
  amount: number;
  status: string;
  stripeChargeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  campaign: {
    id: string;
    internalName: string;
    externalName: string | null;
    slug: string;
    goalAmount: number | null;
    icon: string | null;
    isActive: boolean;
  } | null;
  donorAccount: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  designation: {
    id: string;
    name: string;
    description: string | null;
    goalAmount: number | null;
    isArchived: boolean;
  } | null;
  answers: Array<{
    id: string;
    answerValue: string;
    question: {
      id: string;
      questionText: string;
      questionType: string;
      options: any;
      isRequired: boolean;
      displayOrder: number;
    };
  }>;
}

// DTO for paginated results
interface PaginatedDonationsDTO {
  donations: DonationListItemDTO[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * CRM Donation Service for handling donation operations
 */
export class CrmDonationService {
  /**
   * Gets a paginated list of donations for the organization
   * @param staffSession - The authenticated staff session
   * @param filters - Optional filters for pagination and filtering
   * @returns Paginated donations with campaign and donor details
   */
  public async getDonationsForOrg(
    staffSession: StaffSession,
    filters: PaginationFilters = {}
  ): Promise<PaginatedDonationsDTO> {
    try {
      // Instantiate the repository with staff session
      const donationRepo = new CrmDonationRepository(staffSession);
      
      // Call repository method
      const result = await donationRepo.findAllForOrg(filters);
      
      // Transform the results into clean DTOs
      const donations: DonationListItemDTO[] = result.donations.map(donation => ({
        id: donation.id,
        amount: donation.amount,
        status: donation.status,
        stripeChargeId: donation.stripeChargeId,
        createdAt: donation.createdAt,
        updatedAt: donation.updatedAt,
        campaign: donation.campaign ? {
          id: donation.campaign.id,
          internalName: donation.campaign.internalName,
          externalName: donation.campaign.externalName,
          slug: donation.campaign.slug,
          goalAmount: donation.campaign.goalAmount,
          icon: donation.campaign.icon,
          isActive: donation.campaign.isActive
        } : null,
        donorAccount: donation.donorAccount ? {
          id: donation.donorAccount.id,
          firstName: donation.donorAccount.firstName,
          lastName: donation.donorAccount.lastName,
          email: donation.donorAccount.email
        } : null,
        designation: donation.designation ? {
          id: donation.designation.id,
          name: donation.designation.name,
          description: donation.designation.description,
          goalAmount: donation.designation.goalAmount,
          isArchived: donation.designation.isArchived
        } : null
      }));
      
      return {
        donations,
        pagination: {
          page: result.pagination.page,
          limit: result.pagination.limit,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages
        }
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch donations for organization');
    }
  }

  /**
   * Gets recent donations for the organization
   * @param staffSession - The authenticated staff session
   * @param limit - Maximum number of donations to return (default: 5)
   * @returns Array of recent donations with basic details
   */
  public async getRecentDonations(
    staffSession: StaffSession,
    limit: number = 5
  ): Promise<Array<{
    id: string;
    donorName: string;
    campaignName: string;
    amount: number;
    donatedAt: Date;
  }>> {
    try {
      // Validate limit parameter
      if (limit < 1 || limit > 50) {
        throw new ApiError(400, 'Limit must be between 1 and 50');
      }

      // Instantiate the repository with staff session
      const donationRepo = new CrmDonationRepository(staffSession);
      
      // Call repository method
      const recentDonations = await donationRepo.findRecentForOrg(limit);
      
      return recentDonations;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch recent donations');
    }
  }

  /**
   * Gets detailed information about a specific donation
   * @param staffSession - The authenticated staff session
   * @param donationId - The ID of the donation to retrieve
   * @returns Detailed donation information including answers
   */
  public async getDonationDetails(
    staffSession: StaffSession,
    donationId: string
  ): Promise<DonationDetailsDTO> {
    try {
      // Instantiate the repository with staff session
      const donationRepo = new CrmDonationRepository(staffSession);
      
      // Call repository method
      const donation = await donationRepo.findByIdForOrg(donationId);
      
      // Throw 404 if not found
      if (!donation) {
        throw new ApiError(404, 'Donation not found');
      }
      
      // Transform the result into a clean DTO
      const donationDetails: DonationDetailsDTO = {
        id: donation.id,
        amount: donation.amount,
        status: donation.status,
        stripeChargeId: donation.stripeChargeId,
        createdAt: donation.createdAt,
        updatedAt: donation.updatedAt,
        campaign: donation.campaign ? {
          id: donation.campaign.id,
          internalName: donation.campaign.internalName,
          externalName: donation.campaign.externalName,
          slug: donation.campaign.slug,
          goalAmount: donation.campaign.goalAmount,
          icon: donation.campaign.icon,
          isActive: donation.campaign.isActive
        } : null,
        donorAccount: donation.donorAccount ? {
          id: donation.donorAccount.id,
          firstName: donation.donorAccount.firstName,
          lastName: donation.donorAccount.lastName,
          email: donation.donorAccount.email
        } : null,
        designation: donation.designation ? {
          id: donation.designation.id,
          name: donation.designation.name,
          description: donation.designation.description,
          goalAmount: donation.designation.goalAmount,
          isArchived: donation.designation.isArchived
        } : null,
        answers: donation.answers.map(answer => ({
          id: answer.id,
          answerValue: answer.answerValue,
          question: {
            id: answer.question.id,
            questionText: answer.question.questionText,
            questionType: answer.question.questionType,
            options: answer.question.options,
            isRequired: answer.question.isRequired,
            displayOrder: answer.question.displayOrder
          }
        }))
      };
      
      return donationDetails;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch donation details');
    }
  }
}

