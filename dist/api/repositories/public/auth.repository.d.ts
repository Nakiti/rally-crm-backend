import { Transaction } from 'sequelize';
import { Organization, StaffAccount, StaffRole } from '../../../models/index.js';
import type { StaffRoleEnum } from '../../types/session.types.js';
interface OrganizationCreationData {
    name: string;
    subdomain: string;
}
interface StaffAccountCreationData {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}
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
export declare class PublicAuthRepository {
    /**
     * Checks if an organization subdomain already exists
     * @param subdomain - The subdomain to check
     * @param transaction - Optional database transaction
     * @returns True if subdomain exists, false otherwise
     */
    checkSubdomainExists(subdomain: string, transaction?: Transaction): Promise<boolean>;
    /**
     * Checks if a staff account email already exists
     * @param email - The email to check
     * @param transaction - Optional database transaction
     * @returns True if email exists, false otherwise
     */
    checkEmailExists(email: string, transaction?: Transaction): Promise<boolean>;
    /**
     * Creates a new organization
     * @param organizationData - The organization data
     * @param transaction - Optional database transaction
     * @returns The created organization
     */
    createOrganization(organizationData: OrganizationCreationData, transaction?: Transaction): Promise<Organization>;
    /**
     * Creates a new staff account
     * @param staffData - The staff account data
     * @param transaction - Optional database transaction
     * @returns The created staff account
     */
    createStaffAccount(staffData: StaffAccountCreationData, transaction?: Transaction): Promise<StaffAccount>;
    /**
     * Creates a new staff role linking a staff account to an organization
     * @param roleData - The staff role data
     * @param transaction - Optional database transaction
     * @returns The created staff role
     */
    createStaffRole(roleData: StaffRoleCreationData, transaction?: Transaction): Promise<StaffRole>;
    /**
     * Finds a staff account by email
     * @param email - The email to search for
     * @returns The staff account or null if not found
     */
    findStaffAccountByEmail(email: string): Promise<StaffAccount | null>;
    /**
     * Finds an organization by name
     * @param name - The organization name to search for
     * @returns The organization or null if not found
     */
    findOrganizationByName(name: string): Promise<Organization | null>;
    /**
     * Finds all staff roles for a given staff account with organization details
     * @param staffAccountId - The staff account ID
     * @returns Array of staff roles with organization information
     */
    findStaffRolesWithOrganizations(staffAccountId: string): Promise<Array<{
        staffAccountId: string;
        organizationId: string;
        role: StaffRoleEnum;
        organization: {
            id: string;
            name: string;
            subdomain: string;
        };
    }>>;
    /**
     * Finds a staff role by staff account ID and organization ID
     * @param staffAccountId - The staff account ID
     * @param organizationId - The organization ID
     * @returns The staff role with staff account details or null if not found
     */
    findStaffRoleWithAccount(staffAccountId: string, organizationId: string): Promise<{
        staffAccountId: string;
        organizationId: string;
        role: StaffRoleEnum;
        staffAccount: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
    } | null>;
    /**
     * Creates a database transaction
     * @returns A new database transaction
     */
    createTransaction(): Promise<Transaction>;
}
export {};
//# sourceMappingURL=auth.repository.d.ts.map