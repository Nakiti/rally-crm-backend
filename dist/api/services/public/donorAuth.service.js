import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PublicDonorAuthRepository } from '../../repositories/public/donorAuth.repository.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Service for handling public donor authentication operations.
 * This includes registration, guest account claiming, and login.
 */
export class PublicDonorAuthService {
    /**
     * Register a new donor account or claim an existing guest account
     * @param organizationId - The organization ID
     * @param registrationData - The registration information
     * @returns JWT token and donor information
     */
    async registerOrClaimAccount(organizationId, registrationData) {
        try {
            // Instantiate the PublicDonorAuthRepository with the organizationId
            const donorRepo = new PublicDonorAuthRepository(organizationId);
            // Call findByEmail to check if an account with that email already exists
            const existingAccount = await donorRepo.findByEmail(registrationData.email);
            let donorAccount;
            if (existingAccount) {
                // Check if the account has a password (is already registered)
                if (existingAccount.passwordHash && existingAccount.passwordHash !== 'guest_account') {
                    // Account exists and already has a password - prevent duplicate registration
                    throw new ApiError(409, 'An account with this email already exists.');
                }
                else {
                    // Account exists but has no password (guest account) - claim it
                    const passwordHash = await bcrypt.hash(registrationData.password, 12);
                    donorAccount = await donorRepo.updatePassword(existingAccount.id, passwordHash);
                }
            }
            else {
                // No account exists - create new one
                const passwordHash = await bcrypt.hash(registrationData.password, 12);
                donorAccount = await donorRepo.create({
                    firstName: registrationData.firstName,
                    lastName: registrationData.lastName,
                    email: registrationData.email,
                    passwordHash: passwordHash,
                });
            }
            // Generate and return a new Donor JWT
            return this.generateDonorJWT(donorAccount, organizationId);
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to register donor account');
        }
    }
    /**
     * Authenticate a donor and return JWT token
     * @param organizationId - The organization ID
     * @param credentials - The login credentials
     * @returns JWT token and donor information
     */
    async logIn(organizationId, credentials) {
        try {
            // Instantiate the repository with the organizationId
            const donorRepo = new PublicDonorAuthRepository(organizationId);
            // Call findByEmail
            const donorAccount = await donorRepo.findByEmail(credentials.email);
            // If no user is found, or if their password_hash is NULL (guest account)
            if (!donorAccount || !donorAccount.passwordHash || donorAccount.passwordHash === 'guest_account') {
                throw new ApiError(401, 'Invalid email or password');
            }
            // Use bcrypt.compare to securely verify the provided password
            const isPasswordValid = await bcrypt.compare(credentials.password, donorAccount.passwordHash);
            if (!isPasswordValid) {
                throw new ApiError(401, 'Invalid email or password');
            }
            // Generate and return a new Donor JWT
            return this.generateDonorJWT(donorAccount, organizationId);
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to authenticate donor');
        }
    }
    /**
     * Generate a JWT token for an authenticated donor
     * @param donorAccount - The donor account
     * @param organizationId - The organization ID
     * @returns JWT token and donor information
     */
    generateDonorJWT(donorAccount, organizationId) {
        // Create the JWT payload with donorAccountId and organizationId
        const jwtPayload = {
            donorAccountId: donorAccount.id,
            organizationId: organizationId,
        };
        // Generate the JWT token
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: '24h', // Token expires in 24 hours
        });
        return {
            token,
            donor: {
                id: donorAccount.id,
                firstName: donorAccount.firstName,
                lastName: donorAccount.lastName,
                email: donorAccount.email,
                organizationId: donorAccount.organizationId,
            },
        };
    }
}
// Export convenience functions for direct use
const publicDonorAuthService = new PublicDonorAuthService();
export const registerOrClaimAccount = (organizationId, registrationData) => publicDonorAuthService.registerOrClaimAccount(organizationId, registrationData);
export const logIn = (organizationId, credentials) => publicDonorAuthService.logIn(organizationId, credentials);
//# sourceMappingURL=donorAuth.service.js.map