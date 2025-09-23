import type { Request, Response, NextFunction } from 'express';
/**
 * Create a new campaign available designation
 * POST /api/crm/campaigns/:campaignId/available-designations
 */
export declare const createCampaignAvailableDesignation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all campaign available designations for a specific campaign
 * GET /api/crm/campaigns/:campaignId/available-designations
 */
export declare const getAllCampaignAvailableDesignations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get a specific campaign available designation by ID
 * GET /api/crm/campaigns/:campaignId/available-designations/:id
 */
export declare const getCampaignAvailableDesignation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete a campaign available designation
 * DELETE /api/crm/campaigns/:campaignId/available-designations/:id
 */
export declare const deleteCampaignAvailableDesignation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=campaignAvailableDesignation.controller.d.ts.map