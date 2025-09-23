import type { Request, Response, NextFunction } from 'express';
/**
 * Create a new organization
 * POST /api/organizations
 */
export declare const createNewOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get organization by ID (with authorization check)
 * GET /api/organizations/:id
 */
export declare const getOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get current user's organization (with authorization check)
 * GET /api/organizations/current
 */
export declare const getCurrentOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update organization (with authorization check)
 * PUT /api/organizations/:id
 */
export declare const updateOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update current user's organization (with authorization check)
 * PUT /api/organizations/current
 */
export declare const updateCurrentOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=organization.controller.d.ts.map