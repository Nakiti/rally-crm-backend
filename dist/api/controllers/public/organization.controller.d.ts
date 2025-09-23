import type { Request, Response } from 'express';
import type { NextFunction } from 'express';
/**
 * Get organization by subdomain (public information only)
 * GET /api/public/organizations/subdomain/:subdomain
 */
export declare const getOrganizationBySubdomainController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get organization by ID (public information only)
 * GET /api/public/organizations/:id
 */
export declare const getOrganizationByIdController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=organization.controller.d.ts.map