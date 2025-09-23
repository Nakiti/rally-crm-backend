import type { Request, Response, NextFunction } from 'express';
/**
 * Get all donations for the organization with optional filtering and pagination
 * GET /api/crm/donations
 */
export declare const getDonations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get recent donations for the organization
 * GET /api/crm/donations/recent
 */
export declare const getRecentDonations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get detailed information about a specific donation
 * GET /api/crm/donations/:id
 */
export declare const getDonationDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=donation.controller.d.ts.map