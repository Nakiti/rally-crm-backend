import { CampaignQuestion } from '../../../models/index.js';
import type { StaffSession } from '../../types/express.types.js';
interface CreateCampaignQuestionData {
    questionText: string;
    questionType: string;
    options?: object;
    isRequired?: boolean;
    displayOrder?: number;
}
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
export declare class CrmCampaignQuestionService {
    /**
     * Create a new campaign question
     * @param staffSession - The authenticated staff session
     * @param campaignId - The campaign ID
     * @param data - The question data
     * @returns The created campaign question
     */
    createQuestion(staffSession: StaffSession, campaignId: string, data: CreateCampaignQuestionData): Promise<CampaignQuestion>;
    /**
     * Get all questions for a specific campaign
     * @param staffSession - The authenticated staff session
     * @param campaignId - The campaign ID
     * @returns Array of campaign questions
     */
    getQuestionsForCampaign(staffSession: StaffSession, campaignId: string): Promise<CampaignQuestion[]>;
    /**
     * Update a campaign question
     * @param staffSession - The authenticated staff session
     * @param questionId - The question ID
     * @param data - The update data
     * @returns The updated campaign question
     */
    updateQuestion(staffSession: StaffSession, questionId: string, data: UpdateCampaignQuestionData): Promise<CampaignQuestion>;
    /**
     * Delete a campaign question
     * @param staffSession - The authenticated staff session
     * @param questionId - The question ID
     * @returns Success confirmation
     */
    deleteQuestion(staffSession: StaffSession, questionId: string): Promise<void>;
}
export declare const createQuestion: (staffSession: StaffSession, campaignId: string, data: CreateCampaignQuestionData) => Promise<CampaignQuestion>;
export declare const getQuestionsForCampaign: (staffSession: StaffSession, campaignId: string) => Promise<CampaignQuestion[]>;
export declare const updateQuestion: (staffSession: StaffSession, questionId: string, data: UpdateCampaignQuestionData) => Promise<CampaignQuestion>;
export declare const deleteQuestion: (staffSession: StaffSession, questionId: string) => Promise<void>;
interface BulkUpdateQuestionsData {
    id?: string;
    questionText: string;
    questionType: string;
    options?: object;
    isRequired?: boolean;
    displayOrder?: number;
}
interface BulkUpdateResult {
    added: number;
    updated: number;
    removed: number;
    total: number;
}
/**
 * Update campaign questions in bulk
 * @param staffSession - The authenticated staff session
 * @param campaignId - The campaign ID
 * @param questions - Array of questions to update
 * @returns Result of the bulk update operation
 */
export declare const updateCampaignQuestions: (staffSession: StaffSession, campaignId: string, questions: BulkUpdateQuestionsData[]) => Promise<BulkUpdateResult>;
export {};
//# sourceMappingURL=campaignQuestion.service.d.ts.map