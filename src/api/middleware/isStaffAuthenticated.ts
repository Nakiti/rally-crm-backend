import type{ Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken'
import { StaffAccount, StaffRole } from '../../models/index.js';
import { ApiError } from '../../utils/ApiError.js';
import type { StaffRoleEnum } from '../types/session.types.js';

// Define a type for the decoded JWT payload
interface StaffJwtPayload {
  staffAccountId: string;
  organizationId: string;
  role: StaffRoleEnum;
}

/**
 * Middleware to authenticate staff users via a session-aware JWT.
 * It verifies the token, confirms the user is a member of the specified organization,
 * and attaches a rich user context to the request.
 */
export const isStaffAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Check for and extract the token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication token is required.');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Authentication token is required.');
    }

    // 2. Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as StaffJwtPayload;

    // 3. --- THE CRITICAL NEW STEP: Verify Membership ---
    // Instead of just fetching the user, we now check the `staff_roles` table
    // to confirm that this user is an active member of the organization
    // they claim to be working in via their JWT.
    const staffRole = await StaffRole.findOne({
      where: {
        staffAccountId: decoded.staffAccountId,
        organizationId: decoded.organizationId,
      },
      // Include the full StaffAccount details
      include: [StaffAccount],
    });

    // 4. Check if the membership role exists
    if (!staffRole || !staffRole.staffAccount) {
      throw new ApiError(403, 'Access denied. You are not a member of this organization.');
    }

    // 5. Attach a rich, combined user object to the request.
    // This gives our controllers all the information they need:
    // the user's global identity AND their session-specific role and organization.
    (req).user = {
      id: staffRole.staffAccountId,
      firstName: staffRole.staffAccount?.firstName,
      lastName: staffRole.staffAccount?.lastName,
      email: staffRole.staffAccount?.email,
      // Session-specific context:
      organizationId: staffRole.organizationId,
      role: staffRole.role as StaffRoleEnum,
    };

    // 6. Pass control to the next handler
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, 'Invalid or expired authentication token.'));
    }
    next(error);
  }
};
