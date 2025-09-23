import type { StaffSession } from '../../types/express.types.js';
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
export declare class CrmDonationService {
    /**
     * Gets a paginated list of donations for the organization
     * @param staffSession - The authenticated staff session
     * @param filters - Optional filters for pagination and filtering
     * @returns Paginated donations with campaign and donor details
     */
    getDonationsForOrg(staffSession: StaffSession, filters?: PaginationFilters): Promise<PaginatedDonationsDTO>;
    /**
     * Gets recent donations for the organization
     * @param staffSession - The authenticated staff session
     * @param limit - Maximum number of donations to return (default: 5)
     * @returns Array of recent donations with basic details
     */
    getRecentDonations(staffSession: StaffSession, limit?: number): Promise<Array<{
        id: string;
        donorName: string;
        campaignName: string;
        amount: number;
        donatedAt: Date;
    }>>;
    /**
     * Gets detailed information about a specific donation
     * @param staffSession - The authenticated staff session
     * @param donationId - The ID of the donation to retrieve
     * @returns Detailed donation information including answers
     */
    getDonationDetails(staffSession: StaffSession, donationId: string): Promise<DonationDetailsDTO>;
}
export {};
//# sourceMappingURL=donation.service.d.ts.map