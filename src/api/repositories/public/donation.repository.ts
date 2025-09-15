import { Donation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * A repository for handling public donation operations.
 * This repository provides methods for creating donations from the public API.
 */
export class PublicDonationRepository {
  constructor() {
    // Empty constructor as specified
  }

  /**
   * Creates a new donation record
   * @param donationData - The donation data to create
   * @param transaction - Sequelize transaction object for atomic operations
   * @returns The created Donation record
   */
  public async create(donationData: any, transaction: any): Promise<Donation> {
    try {
      const donation = await Donation.create(donationData, { transaction });
      return donation;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to create donation in database.');
    }
  }
}
