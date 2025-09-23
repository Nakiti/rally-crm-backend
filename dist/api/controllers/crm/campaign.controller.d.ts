import type { Request, Response, NextFunction } from 'express';
/**
 * Create a new campaign for the authenticated staff member's organization
 * POST /api/crm/campaigns
 */
export declare const createCampaign: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all campaigns for the authenticated staff member's organization
 * GET /api/crm/campaigns
 */
export declare const getCampaigns: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get a single campaign by ID for the authenticated staff member
 * GET /api/crm/campaigns/:id
 */
export declare const getCampaignById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update a campaign for the authenticated staff member
 * PUT /api/crm/campaigns/:id
 */
export declare const updateCampaign: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete a campaign for the authenticated staff member
 * DELETE /api/crm/campaigns/:id
 */
export declare const deleteCampaign: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get campaign page configuration
 * GET /api/crm/campaigns/:id/page-config
 */
export declare const getCampaignPageConfig: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update campaign page configuration
 * PUT /api/crm/campaigns/:id/page-config
 */
export declare const updateCampaignPageConfig: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get campaign with available designations
 * GET /api/crm/campaigns/:id/with-designations
 */
export declare const getCampaignWithDesignations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update campaign designations
 * PATCH /api/crm/campaigns/:id/designations
 */
export declare const updateCampaignDesignations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get campaign with questions
 * GET /api/crm/campaigns/:id/with-questions
 */
export declare const getCampaignWithQuestions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update campaign questions (bulk operation)
 * PATCH /api/crm/campaigns/:id/questions
 */
export declare const updateCampaignQuestions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get top-performing campaigns for the organization
 * GET /api/crm/campaigns/top
 */
export declare const getTopCampaignsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Publish a campaign
 * PATCH /api/crm/campaigns/:id/publish
 */
export declare const publishCampaign: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=campaign.controller.d.ts.map