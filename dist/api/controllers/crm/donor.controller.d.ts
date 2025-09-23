import type { Request, Response, NextFunction } from 'express';
/**
 * Get all donors for the authenticated staff member's organization with optional filtering and pagination
 * GET /api/crm/donors
 */
export declare const getDonors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get a single donor profile by ID with their complete donation history
 * GET /api/crm/donors/:id
 */
export declare const getDonor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=donor.controller.d.ts.map