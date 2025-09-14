import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StaffUser } from '../../models';
import { ApiError } from '../../utils/ApiError';
import { Request } from 'express';
import { AuthenticatedRequest } from '../types/express.types';

// Define a type for the decoded JWT payload
interface JwtPayload {
  staffUserId: string;
}

/**
 * Middleware to authenticate staff users via JWT.
 * It verifies the token, fetches the user from the database,
 * and attaches the user object to the request.
 * This satisfies the `AuthenticatedRequest` type for subsequent handlers.
 */
export const isStaffAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Check for the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication token is required.');
    }

    // 2. Extract the token
    const token = authHeader.split(' ')[1];

    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // 4. Fetch the user from the database
    const staffUser = await StaffUser.findByPk(decoded.staffUserId);

    // 5. Check if the user still exists
    if (!staffUser) {
      throw new ApiError(401, 'User associated with this token no longer exists.');
    }

    // 6. Attach the user object to the request.
    // This is the key step that fulfills the AuthenticatedRequest type contract.
    req.user = staffUser;

    // 7. Pass control to the next middleware or controller
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Handle expired or invalid tokens
      return next(new ApiError(401, 'Invalid or expired authentication token.'));
    }
    // Pass any other errors to the global error handler
    next(error);
  }
};
