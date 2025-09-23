import type { Request } from 'express';
export type StaffRoleEnum = 'admin' | 'editor';
/**
 * Defines the shape of the user object that will be attached to the request
 * after a staff member is successfully authenticated for a specific organization session.
 */
export interface StaffSession {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    organizationId?: string;
    role?: StaffRoleEnum;
}
/**
 * Defines the shape of the user object that will be attached to the request
 * after a donor is successfully authenticated.
 */
export interface DonorSession {
    donorAccountId: string;
    organizationId: string;
}
/**
 * Extends the default Express Request interface to include a non-optional `user` property.
 * This type should ONLY be used on routes protected by the `isDonorAuthenticated` middleware.
 */
export interface AuthenticatedDonorRequest extends Request {
    user: DonorSession;
}
//# sourceMappingURL=session.types.d.ts.map