import { CampaignQuestion } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { CrmCampaignQuestionRepository } from '../../repositories/crm/campaignQuestion.repository.js';
import type { StaffSession } from '../../types/express.types.js';

// Interface for campaign question creation data
interface CreateCampaignQuestionData {
  questionText: string;
  questionType: string;
  options?: object;
  isRequired?: boolean;
  displayOrder?: number;
}

// Interface for campaign question update data
interface UpdateCampaignQuestionData {
  questionText?: string;
  questionType?: string;
  options?: object;
  isRequired?: boolean;
  displayOrder?: number;
}

/**
 * Service for handling CRM campaign question management operations.
 * These operations require authentication and organization context.
 */
export class CrmCampaignQuestionService {
  /**
   * Create a new campaign question
   * @param staffSession - The authenticated staff session
   * @param campaignId - The campaign ID
   * @param data - The question data
   * @returns The created campaign question
   */
  public async createQuestion(staffSession: StaffSession, campaignId: string, data: CreateCampaignQuestionData): Promise<CampaignQuestion> {
    try {
      // Instantiate the CrmCampaignQuestionRepository with staffSession
      const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
      
      // Call the repository's create method
      const campaignQuestion = await campaignQuestionRepo.create(campaignId, data);
      
      return campaignQuestion;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create campaign question');
    }
  }

  /**
   * Get all questions for a specific campaign
   * @param staffSession - The authenticated staff session
   * @param campaignId - The campaign ID
   * @returns Array of campaign questions
   */
  public async getQuestionsForCampaign(staffSession: StaffSession, campaignId: string): Promise<CampaignQuestion[]> {
    try {
      // Instantiate the repository with staffSession
      const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
      
      // Call findAllForCampaign
      const campaignQuestions = await campaignQuestionRepo.findAllForCampaign(campaignId);
      
      return campaignQuestions;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch campaign questions');
    }
  }

  /**
   * Update a campaign question
   * @param staffSession - The authenticated staff session
   * @param questionId - The question ID
   * @param data - The update data
   * @returns The updated campaign question
   */
  public async updateQuestion(staffSession: StaffSession, questionId: string, data: UpdateCampaignQuestionData): Promise<CampaignQuestion> {
    try {
      // Instantiate the repository with staffSession
      const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
      
      // Call the repository's update method
      const campaignQuestion = await campaignQuestionRepo.update(questionId, data);
      
      return campaignQuestion;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to update campaign question');
    }
  }

  /**
   * Delete a campaign question
   * @param staffSession - The authenticated staff session
   * @param questionId - The question ID
   * @returns Success confirmation
   */
  public async deleteQuestion(staffSession: StaffSession, questionId: string): Promise<void> {
    try {
      // Instantiate the repository with staffSession
      const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
      
      // Call the repository's delete method
      await campaignQuestionRepo.delete(questionId);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete campaign question');
    }
  }
}

// Export convenience functions for direct use
const crmCampaignQuestionService = new CrmCampaignQuestionService();

export const createQuestion = (staffSession: StaffSession, campaignId: string, data: CreateCampaignQuestionData) =>
  crmCampaignQuestionService.createQuestion(staffSession, campaignId, data);

export const getQuestionsForCampaign = (staffSession: StaffSession, campaignId: string) =>
  crmCampaignQuestionService.getQuestionsForCampaign(staffSession, campaignId);

export const updateQuestion = (staffSession: StaffSession, questionId: string, data: UpdateCampaignQuestionData) =>
  crmCampaignQuestionService.updateQuestion(staffSession, questionId, data);

export const deleteQuestion = (staffSession: StaffSession, questionId: string) =>
  crmCampaignQuestionService.deleteQuestion(staffSession, questionId);

