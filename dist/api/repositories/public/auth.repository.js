import sequelize from '../../../config/database.js';
import { Organization, StaffAccount, StaffRole } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
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
    async checkSubdomainExists(subdomain, transaction) {
        try {
            const existingOrg = await Organization.findOne({
                where: { subdomain },
                ...(transaction && { transaction })
            });
            return !!existingOrg;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to check subdomain availability in database.');
        }
    }
    /**
     * Checks if a staff account email already exists
     * @param email - The email to check
     * @param transaction - Optional database transaction
     * @returns True if email exists, false otherwise
     */
    async checkEmailExists(email, transaction) {
        try {
            const existingStaff = await StaffAccount.findOne({
                where: { email },
                ...(transaction && { transaction })
            });
            return !!existingStaff;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to check email availability in database.');
        }
    }
    /**
     * Creates a new organization
     * @param organizationData - The organization data
     * @param transaction - Optional database transaction
     * @returns The created organization
     */
    async createOrganization(organizationData, transaction) {
        try {
            const organization = await Organization.create(organizationData, transaction ? { transaction } : {});
            console.log('Organization created:', organization);
            return organization;
        }
        catch (error) {
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
    async createStaffAccount(staffData, transaction) {
        try {
            const staffAccount = await StaffAccount.create(staffData, transaction ? { transaction } : {});
            return staffAccount;
        }
        catch (error) {
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
    async createStaffRole(roleData, transaction) {
        try {
            const staffRole = await StaffRole.create(roleData, transaction ? { transaction } : {});
            return staffRole;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to create staff role in database.');
        }
    }
    /**
     * Finds a staff account by email
     * @param email - The email to search for
     * @returns The staff account or null if not found
     */
    async findStaffAccountByEmail(email) {
        try {
            const staffAccount = await StaffAccount.findOne({
                where: { email }
            });
            return staffAccount;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to find staff account in database.');
        }
    }
    /**
     * Finds an organization by name
     * @param name - The organization name to search for
     * @returns The organization or null if not found
     */
    async findOrganizationByName(name) {
        try {
            const organization = await Organization.findOne({
                where: { name }
            });
            return organization;
        }
        catch (error) {
            console.log(error);
            throw new ApiError(500, 'Failed to find organization in database.');
        }
    }
    /**
     * Finds all staff roles for a given staff account with organization details
     * @param staffAccountId - The staff account ID
     * @returns Array of staff roles with organization information
     */
    async findStaffRolesWithOrganizations(staffAccountId) {
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
                const staffData = role.toJSON();
                return {
                    staffAccountId: staffData.staffAccountId,
                    organizationId: staffData.organizationId,
                    role: staffData.role,
                    organization: {
                        id: staffData.organization?.id || '',
                        name: staffData.organization?.name || '',
                        subdomain: staffData.organization?.subdomain || '',
                    }
                };
            });
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
        }
        catch (error) {
            throw new ApiError(500, 'Failed to find staff roles in database.');
        }
    }
    /**
     * Finds a staff role by staff account ID and organization ID
     * @param staffAccountId - The staff account ID
     * @param organizationId - The organization ID
     * @returns The staff role with staff account details or null if not found
     */
    async findStaffRoleWithAccount(staffAccountId, organizationId) {
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
            const staffRoleData = staffRole.toJSON();
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
                role: staffRoleData.role,
                staffAccount: {
                    id: staffRoleData.staffAccount.id,
                    firstName: staffRoleData.staffAccount.firstName,
                    lastName: staffRoleData.staffAccount.lastName,
                    email: staffRoleData.staffAccount.email,
                },
            };
        }
        catch (error) {
            console.error('FAILED TO FIND STAFF ROLE:', error);
            throw new ApiError(500, 'Failed to find staff role in database.');
        }
    }
    /**
     * Creates a database transaction
     * @returns A new database transaction
     */
    async createTransaction() {
        return await sequelize.transaction();
    }
}
//# sourceMappingURL=auth.repository.js.map