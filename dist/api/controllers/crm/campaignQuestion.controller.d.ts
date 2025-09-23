import type { Request, Response, NextFunction } from 'express';
/**
 * Create a new campaign question
 * POST /api/crm/campaigns/:campaignId/questions
 */
export declare const createQuestion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get all questions for a specific campaign
 * GET /api/crm/campaigns/:campaignId/questions
 */
export declare const getQuestionsForCampaign: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update a campaign question
 * PUT /api/crm/campaigns/:campaignId/questions/:questionId
 */
export declare const updateQuestion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete a campaign question
 * DELETE /api/crm/campaigns/:campaignId/questions/:questionId
 */
export declare const deleteQuestion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=campaignQuestion.controller.d.ts.map