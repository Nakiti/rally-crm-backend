import type { StaffRoleEnum } from '../../types/session.types.js';
export interface SignupData {
    organizationName: string;
    organizationSubdomain: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
    organization: string;
}
export interface SessionData {
    organizationId: string;
    staffAccountId: string;
}
export interface OrganizationMembership {
    id: string;
    name: string;
    subdomain: string;
    role: StaffRoleEnum;
}
/**
 * Service for handling public authentication operations.
 * This includes signup, login, and session creation.
 */
export declare class PublicAuthService {
    private authRepository;
    constructor();
    /**
     * Create a new organization with the first admin user (complex transactional operation)
     * @param signupData - The signup information
     * @returns Created organization and staff account information
     */
    signUp(signupData: SignupData): Promise<{
        organization: {
            id: string;
            name: string;
            subdomain: string;
        };
        staffAccount: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
    }>;
    /**
     * Authenticate a user and create a session for the specified organization
     * @param loginData - The login credentials including organization name
     * @returns JWT token and user session information
     */
    logIn(loginData: LoginData): Promise<{
        token: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            organizationId: string;
            role: StaffRoleEnum;
        };
    }>;
    /**
     * Create a session JWT for a specific organization
     * @param sessionData - The session creation data
     * @returns JWT token and user session information
     */
    createSession(sessionData: SessionData): Promise<{
        token: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            organizationId: string;
            role: StaffRoleEnum;
        };
    }>;
}
export declare const signUp: (signupData: SignupData) => Promise<{
    organization: {
        id: string;
        name: string;
        subdomain: string;
    };
    staffAccount: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}>;
export declare const logIn: (loginData: LoginData) => Promise<{
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        organizationId: string;
        role: StaffRoleEnum;
    };
}>;
export declare const createSession: (sessionData: SessionData) => Promise<{
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        organizationId: string;
        role: StaffRoleEnum;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map