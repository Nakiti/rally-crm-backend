import type { Request, Response, NextFunction } from 'express';
import {
  createQuestion as createQuestionService,
  getQuestionsForCampaign as getQuestionsForCampaignService,
  updateQuestion as updateQuestionService,
  deleteQuestion as deleteQuestionService
} from '../../services/crm/campaignQuestion.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { AuthenticatedRequest } from '../../types/express.types.js';

/**
 * Create a new campaign question
 * POST /api/crm/campaigns/:campaignId/questions
 */
export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { campaignId } = req.params;
    const { questionText, questionType, options, isRequired, displayOrder } = req.body;

    // Validate required fields
    if (!campaignId) {
      res.status(400).json({
        success: false,
        message: 'Campaign ID is required'
      });
      return;
    }

    if (!questionText || !questionType) {
      res.status(400).json({
        success: false,
        message: 'Question text and question type are required'
      });
      return;
    }

    const questionData = {
      questionText,
      questionType,
      options,
      isRequired,
      displayOrder
    };

    const campaignQuestion = await createQuestionService((req as AuthenticatedRequest).user, campaignId, questionData);
    
    res.status(201).json({
      success: true,
      data: campaignQuestion,
      message: 'Campaign question created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all questions for a specific campaign
 * GET /api/crm/campaigns/:campaignId/questions
 */
export const getQuestionsForCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { campaignId } = req.params;

    // Validate required fields
    if (!campaignId) {
      res.status(400).json({
        success: false,
        message: 'Campaign ID is required'
      });
      return;
    }

    const campaignQuestions = await getQuestionsForCampaignService((req as AuthenticatedRequest).user, campaignId);
    
    res.status(200).json({
      success: true,
      data: campaignQuestions,
      message: 'Campaign questions retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a campaign question
 * PUT /api/crm/campaigns/:campaignId/questions/:questionId
 */
export const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { campaignId, questionId } = req.params;
    const { questionText, questionType, options, isRequired, displayOrder } = req.body;

    // Validate required fields
    if (!campaignId || !questionId) {
      res.status(400).json({
        success: false,
        message: 'Campaign ID and Question ID are required'
      });
      return;
    }

    const updateData = {
      questionText,
      questionType,
      options,
      isRequired,
      displayOrder
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      (updateData as any)[key] === undefined && delete (updateData as any)[key]
    );

    const campaignQuestion = await updateQuestionService((req as AuthenticatedRequest).user, questionId, updateData);
    
    res.status(200).json({
      success: true,
      data: campaignQuestion,
      message: 'Campaign question updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a campaign question
 * DELETE /api/crm/campaigns/:campaignId/questions/:questionId
 */
export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { campaignId, questionId } = req.params;

    // Validate required fields
    if (!campaignId || !questionId) {
      res.status(400).json({
        success: false,
        message: 'Campaign ID and Question ID are required'
      });
      return;
    }

    await deleteQuestionService((req as AuthenticatedRequest).user, questionId);
    
    res.status(200).json({
      success: true,
      message: 'Campaign question deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
