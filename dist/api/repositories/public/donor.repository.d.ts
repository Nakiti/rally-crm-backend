import type { DonorSession } from '../../types/express.types.js';
/**
 * A repository for handling donor-specific data operations.
 * This repository ensures all queries are scoped to the authenticated donor's context.
 */
export declare class PublicDonorRepository {
    private donorSession;
    constructor(donorSession: DonorSession);
    /**
     * Fetches all donations for the authenticated donor.
     * Includes associated Campaign and Designation data for a rich history view.
     * @returns Array of donations with campaign and designation details
     */
    findDonationHistory(): Promise<Array<{
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
        designation: {
            id: string;
            name: string;
            description: string | null;
            goalAmount: number | null;
            isArchived: boolean;
        } | null;
    }>>;
}
//# sourceMappingURL=donor.repository.d.ts.map