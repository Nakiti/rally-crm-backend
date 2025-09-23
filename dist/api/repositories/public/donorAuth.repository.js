import { DonorAccount } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * A repository for handling donor authentication operations.
 * This repository ensures all operations are scoped to a specific organization.
 */
export class PublicDonorAuthRepository {
    organizationId;
    constructor(organizationId) {
        this.organizationId = organizationId;
    }
    /**
     * Finds a donor account by email within the organization scope
     * @param email - The donor's email address
     * @returns DonorAccount or null if not found
     */
    async findByEmail(email) {
        try {
            const donorAccount = await DonorAccount.findOne({
                where: {
                    email: email,
                    organizationId: this.organizationId,
                },
            });
            return donorAccount;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to find donor account in database.');
        }
    }
    /**
     * Creates a new donor account within the organization scope
     * @param donorData - The donor account data
     * @returns The created DonorAccount
     */
    async create(donorData) {
        try {
            // Automatically inject the organizationId from the constructor
            const donorAccount = await DonorAccount.create({
                organizationId: this.organizationId,
                firstName: donorData.firstName,
                lastName: donorData.lastName,
                email: donorData.email,
                passwordHash: donorData.passwordHash,
            });
            return donorAccount;
        }
        catch (error) {
            // Handle unique constraint violation (duplicate email)
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ApiError(409, 'An account with this email already exists.');
            }
            throw new ApiError(500, 'Failed to create donor account in database.');
        }
    }
    /**
     * Updates the password hash for a donor account
     * @param donorAccountId - The ID of the donor account
     * @param passwordHash - The new password hash
     * @returns The updated DonorAccount
     */
    async updatePassword(donorAccountId, passwordHash) {
        try {
            const [affectedRowsCount, updatedDonorAccounts] = await DonorAccount.update({ passwordHash: passwordHash }, {
                where: {
                    id: donorAccountId,
                    organizationId: this.organizationId, // Ensure we're updating within the correct organization
                },
                returning: true, // Return the updated record
            });
            if (affectedRowsCount === 0) {
                throw new ApiError(404, 'Donor account not found.');
            }
            // Return the first (and should be only) updated record
            return updatedDonorAccounts[0];
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to update donor account password in database.');
        }
    }
}
//# sourceMappingURL=donorAuth.repository.js.map