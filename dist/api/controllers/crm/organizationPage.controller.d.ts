import type { Request, Response, NextFunction } from 'express';
/**
 * Create a new organization page for the authenticated staff member's organization
 * POST /api/crm/organization-pages
 */
export declare const createOrganizationPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all organization pages for the authenticated staff member's organization
 * GET /api/crm/organization-pages
 */
export declare const getOrganizationPages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get a single organization page by ID for the authenticated staff member
 * GET /api/crm/organization-pages/:id
 */
export declare const getOrganizationPageById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get a single organization page by page type for the authenticated staff member
 * GET /api/crm/organization-pages/type/:pageType
 */
export declare const getOrganizationPageByType: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update an organization page for the authenticated staff member
 * PUT /api/crm/organization-pages/:id
 */
export declare const updateOrganizationPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete an organization page for the authenticated staff member
 * DELETE /api/crm/organization-pages/:id
 */
export declare const deleteOrganizationPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get organization page content configuration
 * GET /api/crm/organization-pages/:id/content-config
 */
export declare const getOrganizationPageContentConfig: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update organization page content configuration
 * PUT /api/crm/organization-pages/:id/content-config
 */
export declare const updateOrganizationPageContentConfig: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Publish organization page - updates content config and sets is_published to true
 * PATCH /api/crm/organization-pages/:pageSlug/publish
 */
export declare const publishOrganizationPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=organizationPage.controller.d.ts.map