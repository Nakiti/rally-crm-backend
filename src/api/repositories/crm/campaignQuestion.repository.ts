import { CampaignQuestion, Campaign } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffSession } from '../../types/express.types.js';

// Interface for campaign question creation data
interface CampaignQuestionCreationData {
  questionText: string;
  questionType: string;
  options?: object;
  isRequired?: boolean;
  displayOrder?: number;
}

// Interface for campaign question update data
interface CampaignQuestionUpdateData {
  questionText?: string;
  questionType?: string;
  options?: object;
  isRequired?: boolean;
  displayOrder?: number;
}

/**
 * A repository for handling all database operations for CampaignQuestions
 * in the context of the CRM. All operations are scoped to the staff member's organization
 * and include proper campaign ownership verification.
 */
export class CrmCampaignQuestionRepository {
  private user: StaffSession;

  constructor(user: StaffSession) {
    this.user = user;
  }

  /**
   * Creates a new campaign question with security verification
   * @param campaignId - The campaign ID
   * @param questionData - The question data
   * @returns The created CampaignQuestion
   */
  public async create(campaignId: string, questionData: CampaignQuestionCreationData): Promise<CampaignQuestion> {
    try {
      // Security: Verify that the campaignId belongs to the staffSession.organizationId
      const campaign = await Campaign.findOne({
        where: {
          id: campaignId,
          organizationId: this.user.organizationId!,
        },
      });

      if (!campaign) {
        throw new ApiError(403, 'Access denied. Campaign not found or does not belong to your organization.');
      }

      // Create the campaign question
      const campaignQuestion = await CampaignQuestion.create({
        campaignId: campaignId,
        questionText: questionData.questionText,
        questionType: questionData.questionType,
        options: questionData.options || {},
        isRequired: questionData.isRequired || false,
        displayOrder: questionData.displayOrder || 0,
      });

      return campaignQuestion;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create campaign question in database.');
    }
  }

  /**
   * Fetches all campaign questions for a specific campaign with security verification
   * @param campaignId - The campaign ID
   * @returns Array of CampaignQuestions
   */
  public async findAllForCampaign(campaignId: string): Promise<CampaignQuestion[]> {
    try {
      // Security: JOIN to Campaigns table and check organizationId
      const campaignQuestions = await CampaignQuestion.findAll({
        where: {
          campaignId: campaignId,
        },
        include: [
          {
            model: Campaign,
            as: 'campaign',
            where: {
              organizationId: this.user.organizationId!,
            },
            attributes: [], // We don't need campaign data, just for security check
          },
        ],
        order: [['displayOrder', 'ASC'], ['createdAt', 'ASC']], // Order by display order, then creation date
      });

      return campaignQuestions;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch campaign questions from database.');
    }
  }

  /**
   * Fetches a single campaign question by ID with security verification
   * @param questionId - The question ID
   * @returns The CampaignQuestion or null if not found
   */
  public async findByIdForCampaign(questionId: string): Promise<CampaignQuestion | null> {
    try {
      // Security: JOIN to Campaigns table and check organizationId
      const campaignQuestion = await CampaignQuestion.findOne({
        where: {
          id: questionId,
        },
        include: [
          {
            model: Campaign,
            as: 'campaign',
            where: {
              organizationId: this.user.organizationId!,
            },
            attributes: [], // We don't need campaign data, just for security check
          },
        ],
      });

      return campaignQuestion;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch campaign question from database.');
    }
  }

  /**
   * Updates a campaign question with security verification
   * @param questionId - The question ID
   * @param updateData - The data to update
   * @returns The updated CampaignQuestion
   */
  public async update(questionId: string, updateData: CampaignQuestionUpdateData): Promise<CampaignQuestion> {
    try {
      // Security: First verify the question belongs to the user's organization
      const existingQuestion = await this.findByIdForCampaign(questionId);
      
      if (!existingQuestion) {
        throw new ApiError(404, 'Campaign question not found or access denied.');
      }

      // Update the campaign question
      await existingQuestion.update(updateData);
      
      return existingQuestion;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to update campaign question in database.');
    }
  }

  /**
   * Deletes a campaign question with security verification
   * @param questionId - The question ID
   * @returns Success confirmation
   */
  public async delete(questionId: string): Promise<void> {
    try {
      // Security: First verify the question belongs to the user's organization
      const existingQuestion = await this.findByIdForCampaign(questionId);
      
      if (!existingQuestion) {
        throw new ApiError(404, 'Campaign question not found or access denied.');
      }

      // Delete the campaign question
      await existingQuestion.destroy();
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete campaign question from database.');
    }
  }
}
