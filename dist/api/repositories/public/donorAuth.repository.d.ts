import { DonorAccount } from '../../../models/index.js';
interface DonorCreationData {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}
/**
 * A repository for handling donor authentication operations.
 * This repository ensures all operations are scoped to a specific organization.
 */
export declare class PublicDonorAuthRepository {
    private organizationId;
    constructor(organizationId: string);
    /**
     * Finds a donor account by email within the organization scope
     * @param email - The donor's email address
     * @returns DonorAccount or null if not found
     */
    findByEmail(email: string): Promise<DonorAccount | null>;
    /**
     * Creates a new donor account within the organization scope
     * @param donorData - The donor account data
     * @returns The created DonorAccount
     */
    create(donorData: DonorCreationData): Promise<DonorAccount>;
    /**
     * Updates the password hash for a donor account
     * @param donorAccountId - The ID of the donor account
     * @param passwordHash - The new password hash
     * @returns The updated DonorAccount
     */
    updatePassword(donorAccountId: string, passwordHash: string): Promise<DonorAccount>;
}
export {};
//# sourceMappingURL=donorAuth.repository.d.ts.map