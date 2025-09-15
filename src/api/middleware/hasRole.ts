import type{ Response, NextFunction, Request } from 'express';
import { ApiError } from '../../utils/ApiError.js';
import type{ AuthenticatedRequest, StaffRoleEnum } from '../types/express.types.js';

type StaffRole = StaffRoleEnum;

/**
 * A higher-order function that creates a middleware to check for user roles.
 * This middleware MUST be used after `isStaffAuthenticated`.
 *
 * @param allowedRoles - An array of roles that are allowed to access the route.
 */
export const hasRole = (allowedRoles: StaffRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        // This should theoretically never be hit if `isStaffAuthenticated` is used correctly.
        return next(new ApiError(401, 'Authentication context is missing.'));
    }

    const userRole = req.user.role;

    // Check if the user's role is included in the list of allowed roles.
    if (allowedRoles.includes(userRole as StaffRoleEnum)) {
      // If the role is allowed, proceed to the next handler (the controller).
      return next();
    }

    // If the role is not allowed, pass a 403 Forbidden error.
    return next(new ApiError(403, 'Access Denied: You do not have the required permissions.'));
  };
};
