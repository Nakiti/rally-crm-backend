import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Transaction } from 'sequelize';
import sequelize from '../../../config/database.js';
import { Organization, StaffAccount, StaffRole } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffRoleEnum } from '../../types/express.types.js';

// Interface for signup request data
export interface SignupData {
  organizationName: string;
  organizationSubdomain: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Interface for login request data
export interface LoginData {
  email: string;
  password: string;
}

// Interface for session creation data
export interface SessionData {
  organizationId: string;
  staffAccountId: string;
}

// Interface for organization membership info
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
export class PublicAuthService {
  /**
   * Create a new organization with the first admin user (complex transactional operation)
   * @param signupData - The signup information
   * @returns Created organization and staff account information
   */
  public async signUp(signupData: SignupData): Promise<{
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
  }> {
    // Start a database transaction
    const transaction: Transaction = await sequelize.transaction();

    try {
      // Check if organization subdomain already exists
      const existingOrg = await Organization.findOne({
        where: { subdomain: signupData.organizationSubdomain },
        transaction
      });

      if (existingOrg) {
        throw new ApiError(400, 'Organization subdomain already exists');
      }

      // Check if email already exists
      const existingStaff = await StaffAccount.findOne({
        where: { email: signupData.email },
        transaction
      });

      if (existingStaff) {
        throw new ApiError(400, 'Email already registered');
      }

      // Hash the password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(signupData.password, saltRounds);

      // Create the organization
      const organization = await Organization.create({
        name: signupData.organizationName,
        subdomain: signupData.organizationSubdomain,
      }, { transaction });

      // Create the staff account
      const staffAccount = await StaffAccount.create({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        passwordHash: passwordHash,
      }, { transaction });

      // Create the admin role linking the staff account to the organization
      await StaffRole.create({
        staffAccountId: staffAccount.id,
        organizationId: organization.id,
        role: 'admin' as StaffRoleEnum,
      }, { transaction });

      // Commit the transaction
      await transaction.commit();

      return {
        organization: {
          id: organization.id,
          name: organization.name,
          subdomain: organization.subdomain,
        },
        staffAccount: {
          id: staffAccount.id,
          firstName: staffAccount.firstName,
          lastName: staffAccount.lastName,
          email: staffAccount.email,
        },
      };
    } catch (error) {
      // Rollback the transaction on any error
      await transaction.rollback();
      
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create organization and user account');
    }
  }

  /**
   * Authenticate a user and return their organization memberships
   * @param loginData - The login credentials
   * @returns List of organizations the user is a member of
   */
  public async logIn(loginData: LoginData): Promise<{
    staffAccount: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    organizations: OrganizationMembership[];
  }> {
    try {
      // Find the staff account by email
      const staffAccount = await StaffAccount.findOne({
        where: { email: loginData.email }
      });

      if (!staffAccount) {
        throw new ApiError(401, 'Invalid email or password');
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(loginData.password, staffAccount.passwordHash);
      if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
      }

      // Get all organizations the user is a member of
      const staffRoles = await StaffRole.findAll({
        where: { staffAccountId: staffAccount.id },
        include: [{
          model: Organization,
          as: 'organization',
          attributes: ['id', 'name', 'subdomain']
        }]
      });

      const organizations: OrganizationMembership[] = staffRoles.map(role => ({
        id: role.organizationId,
        name: (role as any).organization?.name || '',
        subdomain: (role as any).organization?.subdomain || '',
        role: role.role as StaffRoleEnum,
      }));

      return {
        staffAccount: {
          id: staffAccount.id,
          firstName: staffAccount.firstName,
          lastName: staffAccount.lastName,
          email: staffAccount.email,
        },
        organizations,
      };
    } catch (error) {
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
  public async createSession(sessionData: SessionData): Promise<{
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      organizationId: string;
      role: StaffRoleEnum;
    };
  }> {
    try {
      // Verify the user is a member of the specified organization
      const staffRole = await StaffRole.findOne({
        where: {
          staffAccountId: sessionData.staffAccountId,
          organizationId: sessionData.organizationId,
        },
        include: [StaffAccount]
      });

      if (!staffRole || !staffRole.staffAccount) {
        throw new ApiError(403, 'Access denied. You are not a member of this organization.');
      }

      // Create the JWT payload
      const jwtPayload = {
        staffAccountId: sessionData.staffAccountId,
        organizationId: sessionData.organizationId,
        role: staffRole.role,
      };

      // Generate the JWT token
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
        expiresIn: '24h', // Token expires in 24 hours
      });

      return {
        token,
        user: {
          id: staffRole.staffAccountId,
          firstName: staffRole.staffAccount.firstName,
          lastName: staffRole.staffAccount.lastName,
          email: staffRole.staffAccount.email,
          organizationId: sessionData.organizationId,
          role: staffRole.role as StaffRoleEnum,
        },
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create session');
    }
  }
}

// Export convenience functions for direct use
const publicAuthService = new PublicAuthService();

export const signUp = (signupData: SignupData) => 
  publicAuthService.signUp(signupData);

export const logIn = (loginData: LoginData) => 
  publicAuthService.logIn(loginData);

export const createSession = (sessionData: SessionData) => 
  publicAuthService.createSession(sessionData);
