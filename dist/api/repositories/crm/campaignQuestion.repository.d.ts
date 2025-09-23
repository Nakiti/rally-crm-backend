import { CampaignQuestion } from '../../../models/index.js';
import type { StaffSession } from '../../types/express.types.js';
interface CampaignQuestionCreationData {
    questionText: string;
    questionType: string;
    options?: object;
    isRequired?: boolean;
    displayOrder?: number;
}
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
export declare class CrmCampaignQuestionRepository {
    private user;
    constructor(user: StaffSession);
    /**
     * Creates a new campaign question with security verification
     * @param campaignId - The campaign ID
     * @param questionData - The question data
     * @returns The created CampaignQuestion
     */
    create(campaignId: string, questionData: CampaignQuestionCreationData): Promise<CampaignQuestion>;
    /**
     * Fetches all campaign questions for a specific campaign with security verification
     * @param campaignId - The campaign ID
     * @returns Array of CampaignQuestions
     */
    findAllForCampaign(campaignId: string): Promise<CampaignQuestion[]>;
    /**
     * Fetches a single campaign question by ID with security verification
     * @param questionId - The question ID
     * @returns The CampaignQuestion or null if not found
     */
    findByIdForCampaign(questionId: string): Promise<CampaignQuestion | null>;
    /**
     * Updates a campaign question with security verification
     * @param questionId - The question ID
     * @param updateData - The data to update
     * @returns The updated CampaignQuestion
     */
    update(questionId: string, updateData: CampaignQuestionUpdateData): Promise<CampaignQuestion>;
    /**
     * Deletes a campaign question with security verification
     * @param questionId - The question ID
     * @returns Success confirmation
     */
    delete(questionId: string): Promise<void>;
}
export {};
//# sourceMappingURL=campaignQuestion.repository.d.ts.map