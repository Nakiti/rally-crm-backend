import type { Response, NextFunction, Request } from 'express';
import type { StaffRoleEnum } from '../types/express.types.js';
type StaffRole = StaffRoleEnum;
/**
 * A higher-order function that creates a middleware to check for user roles.
 * This middleware MUST be used after `isStaffAuthenticated`.
 *
 * @param allowedRoles - An array of roles that are allowed to access the route.
 */
export declare const hasRole: (allowedRoles: StaffRole[]) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=hasRole.d.ts.map