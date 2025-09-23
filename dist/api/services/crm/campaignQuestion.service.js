import { ApiError } from '../../../utils/ApiError.js';
import { CrmCampaignQuestionRepository } from '../../repositories/crm/campaignQuestion.repository.js';
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
    async createQuestion(staffSession, campaignId, data) {
        try {
            // Instantiate the CrmCampaignQuestionRepository with staffSession
            const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
            // Call the repository's create method
            const campaignQuestion = await campaignQuestionRepo.create(campaignId, data);
            return campaignQuestion;
        }
        catch (error) {
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
    async getQuestionsForCampaign(staffSession, campaignId) {
        try {
            // Instantiate the repository with staffSession
            const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
            // Call findAllForCampaign
            const campaignQuestions = await campaignQuestionRepo.findAllForCampaign(campaignId);
            return campaignQuestions;
        }
        catch (error) {
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
    async updateQuestion(staffSession, questionId, data) {
        try {
            // Instantiate the repository with staffSession
            const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
            // Call the repository's update method
            const campaignQuestion = await campaignQuestionRepo.update(questionId, data);
            return campaignQuestion;
        }
        catch (error) {
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
    async deleteQuestion(staffSession, questionId) {
        try {
            // Instantiate the repository with staffSession
            const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
            // Call the repository's delete method
            await campaignQuestionRepo.delete(questionId);
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to delete campaign question');
        }
    }
}
// Export convenience functions for direct use
const crmCampaignQuestionService = new CrmCampaignQuestionService();
export const createQuestion = (staffSession, campaignId, data) => crmCampaignQuestionService.createQuestion(staffSession, campaignId, data);
export const getQuestionsForCampaign = (staffSession, campaignId) => crmCampaignQuestionService.getQuestionsForCampaign(staffSession, campaignId);
export const updateQuestion = (staffSession, questionId, data) => crmCampaignQuestionService.updateQuestion(staffSession, questionId, data);
export const deleteQuestion = (staffSession, questionId) => crmCampaignQuestionService.deleteQuestion(staffSession, questionId);
/**
 * Update campaign questions in bulk
 * @param staffSession - The authenticated staff session
 * @param campaignId - The campaign ID
 * @param questions - Array of questions to update
 * @returns Result of the bulk update operation
 */
export const updateCampaignQuestions = async (staffSession, campaignId, questions) => {
    try {
        // Instantiate the repository with staffSession
        const campaignQuestionRepo = new CrmCampaignQuestionRepository(staffSession);
        // Get existing questions for this campaign
        const existingQuestions = await campaignQuestionRepo.findAllForCampaign(campaignId);
        const existingQuestionIds = new Set(existingQuestions.map(q => q.id));
        const newQuestionIds = new Set(questions.filter(q => q.id).map(q => q.id));
        // Questions to remove (exist in DB but not in new array)
        const questionsToRemove = existingQuestions.filter(q => !newQuestionIds.has(q.id));
        // Questions to add (no ID in new array)
        const questionsToAdd = questions.filter(q => !q.id);
        // Questions to update (have ID and exist in new array)
        const questionsToUpdate = questions.filter(q => q.id && existingQuestionIds.has(q.id));
        let added = 0;
        let updated = 0;
        let removed = 0;
        // Remove questions
        for (const question of questionsToRemove) {
            await campaignQuestionRepo.delete(question.id);
            removed++;
        }
        // Add new questions
        for (const questionData of questionsToAdd) {
            const { id, ...data } = questionData;
            await campaignQuestionRepo.create(campaignId, data);
            added++;
        }
        // Update existing questions
        for (const questionData of questionsToUpdate) {
            const { id, ...data } = questionData;
            await campaignQuestionRepo.update(id, data);
            updated++;
        }
        return {
            added,
            updated,
            removed,
            total: questions.length
        };
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to update campaign questions');
    }
};
//# sourceMappingURL=campaignQuestion.service.js.map