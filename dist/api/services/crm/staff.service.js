import bcrypt from 'bcryptjs';
import { StaffAccount, StaffRole } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Service for handling CRM staff management operations.
 * These operations require authentication and organization context.
 */
export class CrmStaffService {
    /**
     * Get all staff members for an organization
     * @param organizationId - The organization ID
     * @param authenticatedUser - The authenticated user making the request
     * @returns List of staff members with their roles
     */
    async getStaffForOrganization(organizationId, authenticatedUser) {
        try {
            // Verify the authenticated user has access to this organization
            if (authenticatedUser.organizationId !== organizationId) {
                throw new ApiError(403, 'Access denied. You can only view staff for your current organization.');
            }
            // Get all staff roles for the organization with staff account details
            const staffRoles = await StaffRole.findAll({
                where: { organizationId },
                include: [{
                        model: StaffAccount,
                        as: 'staffAccount',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }],
                order: [['createdAt', 'ASC']]
            });
            const staffMembers = staffRoles.map(role => {
                // For composite primary key models, we need to use getDataValue or get({ plain: true })
                // because the association properties aren't directly accessible
                const rawData = role.get({ plain: true });
                return {
                    id: rawData.staffAccountId,
                    firstName: rawData.staffAccount?.firstName || '',
                    lastName: rawData.staffAccount?.lastName || '',
                    email: rawData.staffAccount?.email || '',
                    role: rawData.role,
                    joinedAt: rawData.createdAt
                };
            });
            return staffMembers;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch staff members');
        }
    }
    /**
     * Invite a staff member to an organization
     * @param inviteData - The invitation data
     * @param authenticatedUser - The authenticated user making the request
     * @returns Created or updated staff role information
     */
    async inviteStaffMember(inviteData, authenticatedUser) {
        try {
            const organizationId = authenticatedUser.organizationId;
            // Check if the user is already a member of this organization
            const staffAccountId = await this.getStaffAccountIdByEmail(inviteData.email);
            const existingRole = staffAccountId ? await StaffRole.findOne({
                where: {
                    organizationId,
                    staffAccountId
                }
            }) : null;
            if (existingRole) {
                throw new ApiError(400, 'This user is already a member of your organization');
            }
            // Find or create the staff account
            let staffAccount = await StaffAccount.findOne({
                where: { email: inviteData.email }
            });
            let isNewAccount = false;
            if (!staffAccount) {
                // Create a new staff account with a temporary password
                const tempPassword = this.generateTemporaryPassword();
                const saltRounds = 12;
                const passwordHash = await bcrypt.hash(tempPassword, saltRounds);
                staffAccount = await StaffAccount.create({
                    firstName: 'Pending', // Will be updated when they first log in
                    lastName: 'User',
                    email: inviteData.email,
                    passwordHash
                });
                isNewAccount = true;
            }
            // Create the staff role
            const staffRole = await StaffRole.create({
                staffAccountId: staffAccount.id,
                organizationId,
                role: inviteData.role
            });
            return {
                staffAccount: {
                    id: staffAccount.id,
                    firstName: staffAccount.firstName,
                    lastName: staffAccount.lastName,
                    email: staffAccount.email,
                },
                staffRole: {
                    role: staffRole.role,
                    organizationId: staffRole.organizationId,
                },
                isNewAccount
            };
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to invite staff member');
        }
    }
    /**
     * Update a staff member's role within an organization
     * @param staffAccountId - The staff account ID
     * @param updateData - The role update data
     * @param authenticatedUser - The authenticated user making the request
     * @returns Updated staff role information
     */
    async updateStaffRole(staffAccountId, updateData, authenticatedUser) {
        try {
            const organizationId = authenticatedUser.organizationId;
            // Find the staff role
            const staffRole = await StaffRole.findOne({
                where: {
                    staffAccountId,
                    organizationId
                }
            });
            if (!staffRole) {
                throw new ApiError(404, 'Staff member not found in this organization');
            }
            // Prevent users from modifying their own role
            if (authenticatedUser.id === staffAccountId) {
                throw new ApiError(400, 'You cannot modify your own role');
            }
            // Update the role
            await staffRole.update({ role: updateData.role });
            return {
                staffAccountId,
                role: staffRole.role,
                organizationId
            };
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to update staff role');
        }
    }
    /**
     * Remove a staff member from an organization
     * @param staffAccountId - The staff account ID
     * @param authenticatedUser - The authenticated user making the request
     * @returns Success confirmation
     */
    async removeStaffFromOrganization(staffAccountId, authenticatedUser) {
        try {
            const organizationId = authenticatedUser.organizationId;
            // Find the staff role
            const staffRole = await StaffRole.findOne({
                where: {
                    staffAccountId,
                    organizationId
                }
            });
            if (!staffRole) {
                throw new ApiError(404, 'Staff member not found in this organization');
            }
            // Prevent users from removing themselves
            if (authenticatedUser.id === staffAccountId) {
                throw new ApiError(400, 'You cannot remove yourself from the organization');
            }
            // Check if this is the last admin
            if (staffRole.role === 'admin') {
                const adminCount = await StaffRole.count({
                    where: {
                        organizationId,
                        role: 'admin'
                    }
                });
                if (adminCount <= 1) {
                    throw new ApiError(400, 'Cannot remove the last admin from the organization');
                }
            }
            // Remove the staff role (this doesn't delete the global StaffAccount)
            await staffRole.destroy();
            return { message: 'Staff member removed from organization successfully' };
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to remove staff member');
        }
    }
    /**
     * Get current user information
     * @param authenticatedUser - The authenticated user
     * @returns Current user session information
     */
    async getCurrentUser(authenticatedUser) {
        return authenticatedUser;
    }
    /**
     * Helper method to get staff account ID by email
     * @param email - The email address
     * @returns Staff account ID or null
     */
    async getStaffAccountIdByEmail(email) {
        const staffAccount = await StaffAccount.findOne({
            where: { email },
            attributes: ['id']
        });
        return staffAccount?.id || null;
    }
    /**
     * Helper method to generate a temporary password
     * @returns A random temporary password
     */
    generateTemporaryPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 12; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
// Export convenience functions for direct use
const crmStaffService = new CrmStaffService();
export const getStaffForOrganization = (organizationId, authenticatedUser) => crmStaffService.getStaffForOrganization(organizationId, authenticatedUser);
export const inviteStaffMember = (inviteData, authenticatedUser) => crmStaffService.inviteStaffMember(inviteData, authenticatedUser);
export const updateStaffRole = (staffAccountId, updateData, authenticatedUser) => crmStaffService.updateStaffRole(staffAccountId, updateData, authenticatedUser);
export const removeStaffFromOrganization = (staffAccountId, authenticatedUser) => crmStaffService.removeStaffFromOrganization(staffAccountId, authenticatedUser);
export const getCurrentUser = (authenticatedUser) => crmStaffService.getCurrentUser(authenticatedUser);
//# sourceMappingURL=staff.service.js.map