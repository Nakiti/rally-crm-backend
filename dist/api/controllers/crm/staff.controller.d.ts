import type { Request, Response, NextFunction } from 'express';
/**
 * Get all staff members for the authenticated user's organization
 * GET /api/crm/staff
 */
export declare const getStaffForOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Invite a new staff member to the organization
 * POST /api/crm/staff/invite
 */
export declare const inviteStaffMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update a staff member's role within the organization
 * PATCH /api/crm/staff/:staffAccountId
 */
export declare const updateStaffRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Remove a staff member from the organization
 * DELETE /api/crm/staff/:staffAccountId
 */
export declare const removeStaffFromOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get current authenticated user information
 * GET /api/crm/me
 */
export declare const getCurrentUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=staff.controller.d.ts.map