import { Response, NextFunction, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../../utils/ApiError';
import { StaffAccount } from '../../models';

// Define a type for the decoded payload of the temporary JWT
interface TempJwtPayload {
  staffAccountId: string;
}

// Extend the global Express Request to include the staffAccountId for this specific flow
declare global {
  namespace Express {
    export interface Request {
      staffAccountId?: string;
    }
  }
}

/**
 * Middleware to verify a temporary "global authentication" JWT.
 * This is used to secure the second step of the staff login flow (session creation).
 * It verifies the tempToken and attaches the staffAccountId to the request.
 */
export const isGloballyAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Check for the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'A temporary authentication token is required.');
    }

    // 2. Extract the temporary token
    const tempToken = authHeader.split(' ')[1];

    // 3. Verify the token
    const decoded = jwt.verify(tempToken as string, process.env.JWT_SECRET as string) as JwtPayload;

    // 4. Ensure the payload contains the necessary ID
    if (!decoded.staffAccountId) {
      throw new ApiError(401, 'Invalid temporary token payload.');
    }
    
    // An optional but recommended step: Check if the user account still exists
    // const staffAccount = await StaffAccount.findByPk(decoded.staffAccountId);
    // if (!staffAccount) {
    //     throw new ApiError(401, 'User associated with this token no longer exists.');
    // }

    // 5. Attach the staffAccountId to the request for the controller to use
    req.staffAccountId = decoded.staffAccountId;

    // 6. Pass control to the next handler (validate middleware, then controller)
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Handle expired or invalid tokens
      return next(new ApiError(401, 'Your session selection has expired. Please log in again.'));
    }
    // Pass any other errors to the global error handler
    next(error);
  }
};
