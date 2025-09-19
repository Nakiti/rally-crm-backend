import type { Request } from 'express';
import type { StaffSession, DonorSession } from './session.types.js';

/**
 * Extends the default Express Request interface to include a non-optional `user` property.
 * This type should ONLY be used on routes protected by authentication middleware.
 */
export interface AuthenticatedRequest extends Request {
  user: StaffSession | DonorSession;
}

// Re-export types for convenience
export type { StaffSession, DonorSession, StaffRoleEnum } from './session.types.js';
