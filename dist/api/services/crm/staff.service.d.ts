import type { StaffRoleEnum, StaffSession } from '../../types/session.types.js';
export interface InviteStaffData {
    email: string;
    role: StaffRoleEnum;
}
export interface StaffMemberInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: StaffRoleEnum;
    joinedAt: Date;
}
export interface UpdateStaffRoleData {
    role: StaffRoleEnum;
}
/**
 * Service for handling CRM staff management operations.
 * These operations require authentication and organization context.
 */
export declare class CrmStaffService {
    /**
     * Get all staff members for an organization
     * @param organizationId - The organization ID
     * @param authenticatedUser - The authenticated user making the request
     * @returns List of staff members with their roles
     */
    getStaffForOrganization(organizationId: string, authenticatedUser: StaffSession): Promise<StaffMemberInfo[]>;
    /**
     * Invite a staff member to an organization
     * @param inviteData - The invitation data
     * @param authenticatedUser - The authenticated user making the request
     * @returns Created or updated staff role information
     */
    inviteStaffMember(inviteData: InviteStaffData, authenticatedUser: StaffSession): Promise<{
        staffAccount: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
        staffRole: {
            role: StaffRoleEnum;
            organizationId: string;
        };
        isNewAccount: boolean;
    }>;
    /**
     * Update a staff member's role within an organization
     * @param staffAccountId - The staff account ID
     * @param updateData - The role update data
     * @param authenticatedUser - The authenticated user making the request
     * @returns Updated staff role information
     */
    updateStaffRole(staffAccountId: string, updateData: UpdateStaffRoleData, authenticatedUser: StaffSession): Promise<{
        staffAccountId: string;
        role: StaffRoleEnum;
        organizationId: string;
    }>;
    /**
     * Remove a staff member from an organization
     * @param staffAccountId - The staff account ID
     * @param authenticatedUser - The authenticated user making the request
     * @returns Success confirmation
     */
    removeStaffFromOrganization(staffAccountId: string, authenticatedUser: StaffSession): Promise<{
        message: string;
    }>;
    /**
     * Get current user information
     * @param authenticatedUser - The authenticated user
     * @returns Current user session information
     */
    getCurrentUser(authenticatedUser: StaffSession): Promise<StaffSession>;
    /**
     * Helper method to get staff account ID by email
     * @param email - The email address
     * @returns Staff account ID or null
     */
    private getStaffAccountIdByEmail;
    /**
     * Helper method to generate a temporary password
     * @returns A random temporary password
     */
    private generateTemporaryPassword;
}
export declare const getStaffForOrganization: (organizationId: string, authenticatedUser: StaffSession) => Promise<StaffMemberInfo[]>;
export declare const inviteStaffMember: (inviteData: InviteStaffData, authenticatedUser: StaffSession) => Promise<{
    staffAccount: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    staffRole: {
        role: StaffRoleEnum;
        organizationId: string;
    };
    isNewAccount: boolean;
}>;
export declare const updateStaffRole: (staffAccountId: string, updateData: UpdateStaffRoleData, authenticatedUser: StaffSession) => Promise<{
    staffAccountId: string;
    role: StaffRoleEnum;
    organizationId: string;
}>;
export declare const removeStaffFromOrganization: (staffAccountId: string, authenticatedUser: StaffSession) => Promise<{
    message: string;
}>;
export declare const getCurrentUser: (authenticatedUser: StaffSession) => Promise<StaffSession>;
//# sourceMappingURL=staff.service.d.ts.map