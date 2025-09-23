export interface DonorRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface DonorLoginCredentials {
    email: string;
    password: string;
}
interface DonorAuthResponse {
    token: string;
    donor: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        organizationId: string;
    };
}
/**
 * Service for handling public donor authentication operations.
 * This includes registration, guest account claiming, and login.
 */
export declare class PublicDonorAuthService {
    /**
     * Register a new donor account or claim an existing guest account
     * @param organizationId - The organization ID
     * @param registrationData - The registration information
     * @returns JWT token and donor information
     */
    registerOrClaimAccount(organizationId: string, registrationData: DonorRegistrationData): Promise<DonorAuthResponse>;
    /**
     * Authenticate a donor and return JWT token
     * @param organizationId - The organization ID
     * @param credentials - The login credentials
     * @returns JWT token and donor information
     */
    logIn(organizationId: string, credentials: DonorLoginCredentials): Promise<DonorAuthResponse>;
    /**
     * Generate a JWT token for an authenticated donor
     * @param donorAccount - The donor account
     * @param organizationId - The organization ID
     * @returns JWT token and donor information
     */
    private generateDonorJWT;
}
export declare const registerOrClaimAccount: (organizationId: string, registrationData: DonorRegistrationData) => Promise<DonorAuthResponse>;
export declare const logIn: (organizationId: string, credentials: DonorLoginCredentials) => Promise<DonorAuthResponse>;
export {};
//# sourceMappingURL=donorAuth.service.d.ts.map