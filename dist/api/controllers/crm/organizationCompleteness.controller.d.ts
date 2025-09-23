import type { Request, Response, NextFunction } from 'express';
/**
 * Check and update organization completeness status
 * POST /api/crm/organizations/current/check-completeness
 */
export declare const checkOrganizationCompleteness: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get organization completeness status details
 * GET /api/crm/organizations/current/completeness-status
 */
export declare const getOrganizationCompletenessStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Publish site - runs final completeness check and publishes if all requirements are met
 * PATCH /api/crm/organizations/publish-site
 */
export declare const publishSite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=organizationCompleteness.controller.d.ts.map