import type { Request, Response, NextFunction } from 'express';
/**
 * Get organization page by organization ID and page type (public information only)
 * GET /api/public/organizations/:id/pages/type/:pageType
 */
export declare const getOrganizationPageByTypeController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get organization page by organization subdomain and page type (public information only)
 * GET /api/public/organizations/subdomain/:subdomain/pages/type/:pageType
 */
export declare const getOrganizationPageBySubdomainAndTypeController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all organization pages for an organization by ID (public information only)
 * GET /api/public/organizations/:id/pages
 */
export declare const getOrganizationPagesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all organization pages for an organization by subdomain (public information only)
 * GET /api/public/organizations/subdomain/:subdomain/pages
 */
export declare const getOrganizationPagesBySubdomainController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=organizationPage.controller.d.ts.map