import { Request, Response } from 'express';
import { StaffUser } from '../../models';

declare global {
    namespace Express {
      export interface Request {
        user?: StaffUser;
      }
    }
  }

/**
 * Extends the default Express Request interface to include a non-optional `user` property.
 * This type should ONLY be used on routes protected by the `isStaffAuthenticated` middleware.
 */
export interface AuthenticatedRequest extends Request {
  user: StaffUser;
}
