import { ApiError } from '../../../utils/ApiError.js';
import { CrmDonationRepository } from '../../repositories/crm/donation.repository.js';
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
    async getDonationsForOrg(staffSession, filters = {}) {
        try {
            // Instantiate the repository with staff session
            const donationRepo = new CrmDonationRepository(staffSession);
            // Call repository method
            const result = await donationRepo.findAllForOrg(filters);
            // Transform the results into clean DTOs
            const donations = result.donations.map(donation => ({
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
        }
        catch (error) {
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
    async getRecentDonations(staffSession, limit = 5) {
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
        }
        catch (error) {
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
    async getDonationDetails(staffSession, donationId) {
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
            const donationDetails = {
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
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch donation details');
        }
    }
}
//# sourceMappingURL=donation.service.js.map