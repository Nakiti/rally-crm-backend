import { Transaction } from 'sequelize';
import sequelize from '../../../config/database.js';
import { Organization, StaffAccount, StaffRole } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffRoleEnum } from '../../types/session.types.js';

// Interface for organization creation data
interface OrganizationCreationData {
  name: string;
  subdomain: string;
}

// Interface for staff account creation data
interface StaffAccountCreationData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

// Interface for staff role creation data
interface StaffRoleCreationData {
  staffAccountId: string;
  organizationId: string;
  role: StaffRoleEnum;
}

/**
 * A repository for handling public authentication database operations.
 * This repository handles organization creation, staff account management,
 * and authentication-related database queries.
 */
export class PublicAuthRepository {
  
  /**
   * Checks if an organization subdomain already exists
   * @param subdomain - The subdomain to check
   * @param transaction - Optional database transaction
   * @returns True if subdomain exists, false otherwise
   */
  public async checkSubdomainExists(subdomain: string, transaction?: Transaction): Promise<boolean> {
    try {
      const existingOrg = await Organization.findOne({
        where: { subdomain },
        ...(transaction && { transaction })
      });
      return !!existingOrg;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to check subdomain availability in database.');
    }
  }

  /**
   * Checks if a staff account email already exists
   * @param email - The email to check
   * @param transaction - Optional database transaction
   * @returns True if email exists, false otherwise
   */
  public async checkEmailExists(email: string, transaction?: Transaction): Promise<boolean> {
    try {
      const existingStaff = await StaffAccount.findOne({
        where: { email },
        ...(transaction && { transaction })
      });
      return !!existingStaff;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to check email availability in database.');
    }
  }

  /**
   * Creates a new organization
   * @param organizationData - The organization data
   * @param transaction - Optional database transaction
   * @returns The created organization
   */
  public async createOrganization(organizationData: OrganizationCreationData, transaction?: Transaction): Promise<Organization> {
    try {
      const organization = await Organization.create(organizationData, 
        transaction ? { transaction } : {}
      );
      console.log('Organization created:', organization);
      return organization;
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiError(409, 'An organization with this subdomain already exists.');
      }
      throw new ApiError(500, 'Failed to create organization in database.');
    } 
  }

  /**
   * Creates a new staff account
   * @param staffData - The staff account data
   * @param transaction - Optional database transaction
   * @returns The created staff account
   */
  public async createStaffAccount(staffData: StaffAccountCreationData, transaction?: Transaction): Promise<StaffAccount> {
    try {
      const staffAccount = await StaffAccount.create(staffData, 
        transaction ? { transaction } : {}
      );
      return staffAccount;
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiError(409, 'An account with this email already exists.');
      }
      throw new ApiError(500, 'Failed to create staff account in database.');
    }
  }

  /**
   * Creates a new staff role linking a staff account to an organization
   * @param roleData - The staff role data
   * @param transaction - Optional database transaction
   * @returns The created staff role
   */
  public async createStaffRole(roleData: StaffRoleCreationData, transaction?: Transaction): Promise<StaffRole> {
    try {
      const staffRole = await StaffRole.create(roleData, 
        transaction ? { transaction } : {}
      );
      return staffRole;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to create staff role in database.');
    }
  }

  /**
   * Finds a staff account by email
   * @param email - The email to search for
   * @returns The staff account or null if not found
   */
  public async findStaffAccountByEmail(email: string): Promise<StaffAccount | null> {
    try {
      const staffAccount = await StaffAccount.findOne({
        where: { email }
      });
      return staffAccount;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to find staff account in database.');
    }
  }

  /**
   * Finds an organization by name
   * @param name - The organization name to search for
   * @returns The organization or null if not found
   */
  public async findOrganizationByName(name: string): Promise<Organization | null> {
    try {
      const organization = await Organization.findOne({
        where: { name }
      });
      return organization;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to find organization in database.');
    }
  }

  /**
   * Finds all staff roles for a given staff account with organization details
   * @param staffAccountId - The staff account ID
   * @returns Array of staff roles with organization information
   */
  public async findStaffRolesWithOrganizations(staffAccountId: string): Promise<Array<{
    staffAccountId: string;
    organizationId: string;
    role: StaffRoleEnum;
    organization: {
      id: string;
      name: string;
      subdomain: string;
    };
  }>> {
    try {
      const staffRoles = await StaffRole.findAll({
        where: { staffAccountId },
        include: [{
          model: Organization,
          as: 'organization',
          attributes: ['id', 'name', 'subdomain']
        }]
      });


      return staffRoles.map((role) => {
        const staffData = role.toJSON()

        return {
            staffAccountId: staffData.staffAccountId,
            organizationId: staffData.organizationId,
            role: staffData.role as StaffRoleEnum,
            organization: {
              id: (staffData as any).organization?.id || '',
              name: (staffData as any).organization?.name || '',
              subdomain: (staffData as any).organization?.subdomain || '',
            }
        }
      })

    //   return staffRoles.map((role) => ({
    //     staffAccountId: role.staffAccountId,
    //     organizationId: role.organizationId,
    //     role: role.role as StaffRoleEnum,
    //     organization: {
    //       id: (role as any).organization?.id || '',
    //       name: (role as any).organization?.name || '',
    //       subdomain: (role as any).organization?.subdomain || '',
    //     }
    //   }));
    } catch (error: any) {
      throw new ApiError(500, 'Failed to find staff roles in database.');
    }
  }

  /**
   * Finds a staff role by staff account ID and organization ID
   * @param staffAccountId - The staff account ID
   * @param organizationId - The organization ID
   * @returns The staff role with staff account details or null if not found
   */
public async findStaffRoleWithAccount(
  staffAccountId: string,
  organizationId: string
): Promise<{
  staffAccountId: string;
  organizationId: string;
  role: StaffRoleEnum;
  staffAccount: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
} | null> {
  try {
    const staffRole = await StaffRole.findOne({
      where: {
        staffAccountId,
        organizationId,
      },
      include: [{ model: StaffAccount, as: 'staffAccount' }],
    });

    // 1. If no role is found at all, return null immediately.
    if (!staffRole) {
      return null;
    }

    // 2. Convert to a plain object to safely access properties.
    const staffRoleData = staffRole.toJSON() as any;

    // 3. Ensure the included staffAccount actually exists before returning.
    if (!staffRoleData.staffAccount) {
      // This case might happen if the association is broken or data is inconsistent.
      console.error('StaffRole found, but associated StaffAccount is missing.');
      return null;
    }

    // 4. Build and return the final object that matches the Promise type.
    return {
      staffAccountId: staffRoleData.staffAccountId,
      organizationId: staffRoleData.organizationId,
      role: staffRoleData.role as StaffRoleEnum,
      staffAccount: {
        id: staffRoleData.staffAccount.id,
        firstName: staffRoleData.staffAccount.firstName,
        lastName: staffRoleData.staffAccount.lastName,
        email: staffRoleData.staffAccount.email,
      },
    };
  } catch (error: any) {
    console.error('FAILED TO FIND STAFF ROLE:', error);
    throw new ApiError(500, 'Failed to find staff role in database.');
  }
}

  /**
   * Creates a database transaction
   * @returns A new database transaction
   */
  public async createTransaction(): Promise<Transaction> {
    return await sequelize.transaction();
  }
}
