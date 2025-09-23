import type { Request, Response, NextFunction } from 'express';
/**
 * Create a new designation
 * POST /api/crm/designations
 */
export declare const createDesignation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all designations for the organization
 * GET /api/crm/designations
 */
export declare const getAllDesignations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update a designation
 * PUT /api/crm/designations/:id
 */
export declare const updateDesignation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Archive a designation (soft delete)
 * DELETE /api/crm/designations/:id
 */
export declare const archiveDesignation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=designation.controller.d.ts.map