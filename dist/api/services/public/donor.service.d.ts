import type { DonorSession } from '../../types/session.types.js';
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
export declare class PublicDonorService {
    /**
     * Gets donation history for an authenticated donor, transforming data into public-safe DTOs
     * @param donorSession - The authenticated donor's session context
     * @returns Promise<PublicDonationDTO[]> - Array of public-safe donation data
     */
    getDonationHistoryForDonor(donorSession: DonorSession): Promise<PublicDonationDTO[]>;
}
export declare const getDonationHistoryForDonor: (donorSession: DonorSession) => Promise<PublicDonationDTO[]>;
export {};
//# sourceMappingURL=donor.service.d.ts.map