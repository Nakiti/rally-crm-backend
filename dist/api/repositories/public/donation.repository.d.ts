import { Donation } from '../../../models/index.js';
/**
 * A repository for handling public donation operations.
 * This repository provides methods for creating donations from the public API.
 */
export declare class PublicDonationRepository {
    constructor();
    /**
     * Creates a new donation record
     * @param donationData - The donation data to create
     * @param transaction - Sequelize transaction object for atomic operations
     * @returns The created Donation record
     */
    create(donationData: any, transaction: any): Promise<Donation>;
}
//# sourceMappingURL=donation.repository.d.ts.map