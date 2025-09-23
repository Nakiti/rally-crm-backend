import type { StaffSession } from '../../types/session.types.js';
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
interface PaginatedDonations {
    donations: Array<{
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
    }>;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
/**
 * A repository for handling CRM donation operations.
 * This repository ensures all queries are scoped to the authenticated staff member's organization.
 */
export declare class CrmDonationRepository {
    private staffSession;
    constructor(staffSession: StaffSession);
    /**
     * Fetches a paginated list of donations for the organization
     * @param filters - Optional filters for pagination and filtering
     * @returns Paginated donations with campaign and donor account details
     */
    findAllForOrg(filters?: PaginationFilters): Promise<PaginatedDonations>;
    /**
     * Fetches recent donations for the organization
     * @param limit - Maximum number of donations to return (default: 5)
     * @returns Array of recent donations with basic details
     */
    findRecentForOrg(limit?: number): Promise<Array<{
        id: string;
        donorName: string;
        campaignName: string;
        amount: number;
        donatedAt: Date;
    }>>;
    /**
     * Fetches a single donation by ID, scoped to the organization
     * @param id - The donation ID
     * @returns Single donation with full details including answers
     */
    findByIdForOrg(id: string): Promise<{
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
    } | null>;
}
export {};
//# sourceMappingURL=donation.repository.d.ts.map