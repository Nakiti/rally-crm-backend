import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../../utils/ApiError.js';
import { PublicAuthRepository } from '../../repositories/public/auth.repository.js';
/**
 * Service for handling public authentication operations.
 * This includes signup, login, and session creation.
 */
export class PublicAuthService {
    authRepository;
    constructor() {
        this.authRepository = new PublicAuthRepository();
    }
    /**
     * Create a new organization with the first admin user (complex transactional operation)
     * @param signupData - The signup information
     * @returns Created organization and staff account information
     */
    async signUp(signupData) {
        // Start a database transaction
        const transaction = await this.authRepository.createTransaction();
        try {
            // Check if organization subdomain already exists
            const subdomainExists = await this.authRepository.checkSubdomainExists(signupData.organizationSubdomain, transaction);
            if (subdomainExists) {
                throw new ApiError(400, 'Organization subdomain already exists');
            }
            // Check if email already exists
            const emailExists = await this.authRepository.checkEmailExists(signupData.email, transaction);
            if (emailExists) {
                throw new ApiError(400, 'Email already registered');
            }
            // Hash the password
            const saltRounds = 12;
            const passwordHash = await bcrypt.hash(signupData.password, saltRounds);
            // Create the organization
            const organization = await this.authRepository.createOrganization({
                name: signupData.organizationName,
                subdomain: signupData.organizationSubdomain,
            }, transaction);
            // Create the staff account
            const staffAccount = await this.authRepository.createStaffAccount({
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                email: signupData.email,
                passwordHash: passwordHash,
            }, transaction);
            const organizationData = organization.toJSON();
            const staffAccountData = staffAccount.toJSON();
            console.log('Organization Data:', organizationData);
            console.log('Staff Account Data:', staffAccountData);
            // Create the admin role linking the staff account to the organization
            await this.authRepository.createStaffRole({
                staffAccountId: staffAccountData.id,
                organizationId: organizationData.id,
                role: 'admin',
            }, transaction);
            // Commit the transaction
            await transaction.commit();
            return {
                organization: {
                    id: organizationData.id,
                    name: organizationData.name,
                    subdomain: organizationData.subdomain,
                },
                staffAccount: {
                    id: staffAccountData.id,
                    firstName: staffAccountData.firstName,
                    lastName: staffAccountData.lastName,
                    email: staffAccountData.email,
                },
            };
        }
        catch (error) {
            // Rollback the transaction on any error
            await transaction.rollback();
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to create organization and user account');
        }
    }
    /**
     * Authenticate a user and create a session for the specified organization
     * @param loginData - The login credentials including organization name
     * @returns JWT token and user session information
     */
    async logIn(loginData) {
        try {
            // Find the staff account by email
            const staffAccount = await this.authRepository.findStaffAccountByEmail(loginData.email);
            if (!staffAccount) {
                throw new ApiError(401, 'Invalid email or password');
            }
            const staffAccountData = staffAccount.toJSON();
            // Verify the password
            const isPasswordValid = await bcrypt.compare(loginData.password, staffAccountData.passwordHash);
            if (!isPasswordValid) {
                throw new ApiError(401, 'Invalid email or password');
            }
            // Find the organization by name
            const organization = await this.authRepository.findOrganizationByName(loginData.organization);
            if (!organization) {
                throw new ApiError(404, 'Organization not found');
            }
            const organizationData = organization.toJSON();
            console.log("organization data", organizationData);
            console.log("staff caonu data", staffAccountData);
            // Verify the user has a role in this organization
            const staffRole = await this.authRepository.findStaffRoleWithAccount(staffAccountData.id, organizationData.id);
            // const staffRoleData = staffRole.toJson()
            if (!staffRole) {
                throw new ApiError(403, 'You do not have access to this organization');
            }
            // Create the JWT payload
            const jwtPayload = {
                staffAccountId: staffAccountData.id,
                organizationId: organizationData.id,
                role: staffRole.role,
            };
            // Generate the JWT token
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
                expiresIn: '24h', // Token expires in 24 hours
            });
            return {
                token,
                user: {
                    id: staffAccountData.id,
                    firstName: staffAccountData.firstName,
                    lastName: staffAccountData.lastName,
                    email: staffAccountData.email,
                    organizationId: organizationData.id,
                    role: staffRole.role,
                },
            };
        }
        catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to authenticate user');
        }
    }
    /**
     * Create a session JWT for a specific organization
     * @param sessionData - The session creation data
     * @returns JWT token and user session information
     */
    async createSession(sessionData) {
        try {
            // Verify the user is a member of the specified organization
            const staffRole = await this.authRepository.findStaffRoleWithAccount(sessionData.staffAccountId, sessionData.organizationId);
            if (!staffRole) {
                throw new ApiError(403, 'Access denied. You are not a member of this organization.');
            }
            // Create the JWT payload
            const jwtPayload = {
                staffAccountId: sessionData.staffAccountId,
                organizationId: sessionData.organizationId,
                role: staffRole.role,
            };
            // Generate the JWT token
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
                expiresIn: '24h', // Token expires in 24 hours
            });
            return {
                token,
                user: {
                    id: staffRole.staffAccount.id,
                    firstName: staffRole.staffAccount.firstName,
                    lastName: staffRole.staffAccount.lastName,
                    email: staffRole.staffAccount.email,
                    organizationId: sessionData.organizationId,
                    role: staffRole.role,
                },
            };
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to create session');
        }
    }
}
// Export convenience functions for direct use
const publicAuthService = new PublicAuthService();
export const signUp = (signupData) => publicAuthService.signUp(signupData);
export const logIn = (loginData) => publicAuthService.logIn(loginData);
export const createSession = (sessionData) => publicAuthService.createSession(sessionData);
//# sourceMappingURL=auth.service.js.map