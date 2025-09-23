import { Router } from 'express';
import { createQuestion, getQuestionsForCampaign, updateQuestion, deleteQuestion } from '../../controllers/crm/campaignQuestion.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import { createQuestionSchema, updateQuestionSchema, getQuestionsForCampaignSchema, deleteQuestionSchema } from './campaignQuestion.schemas.js';
const router = Router();
/**
 * @route   POST /api/crm/campaigns/:campaignId/questions
 * @desc    Create a new question for a campaign
 * @access  Private (Admin, Editor)
 */
router.post('/', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(createQuestionSchema), createQuestion);
/**
 * @route   GET /api/crm/campaigns/:campaignId/questions
 * @desc    Get all questions for a specific campaign
 * @access  Private (Admin, Editor)
 */
router.get('/', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(getQuestionsForCampaignSchema), getQuestionsForCampaign);
/**
 * @route   PUT /api/crm/campaigns/:campaignId/questions/:questionId
 * @desc    Update a specific campaign question
 * @access  Private (Admin, Editor)
 */
router.put('/:questionId', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(updateQuestionSchema), updateQuestion);
/**
 * @route   DELETE /api/crm/campaigns/:campaignId/questions/:questionId
 * @desc    Delete a specific campaign question
 * @access  Private (Admin, Editor)
 */
router.delete('/:questionId', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(deleteQuestionSchema), deleteQuestion);
export default router;
//# sourceMappingURL=campaignQuestion.routes.js.map