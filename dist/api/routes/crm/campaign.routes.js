import { Router } from 'express';
import { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign, getCampaignPageConfig, updateCampaignPageConfig, updateCampaignDesignations, getCampaignWithDesignations, getCampaignWithQuestions, updateCampaignQuestions, publishCampaign, getTopCampaignsController } from '../../controllers/crm/campaign.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import { createCampaignSchema, updateCampaignSchema, getCampaignByIdSchema, deleteCampaignSchema, updatePageConfigSchema, getPageConfigSchema, updateCampaignDesignationsSchema, updateCampaignQuestionsSchema, publishCampaignSchema, getTopCampaignsSchema } from './campaign.schemas.js';
import campaignQuestionRoutes from './campaignQuestion.routes.js';
import campaignAvailableDesignationRoutes from './campaignAvailableDesignation.routes.js';
const router = Router();
// All routes require authentication
router.use(isStaffAuthenticated);
/**
 * @route   POST /api/crm/campaigns
 * @desc    Create a new campaign for the organization
 * @access  Private (Admin, Editor)
 */
router.post('/', hasRole(['admin', 'editor']), validate(createCampaignSchema), createCampaign);
/**
 * @route   GET /api/crm/campaigns
 * @desc    Get all campaigns for the organization
 * @access  Private (Admin, Editor)
 */
router.get('/', hasRole(['admin', 'editor']), getCampaigns);
/**
 * @route   GET /api/crm/campaigns/top
 * @desc    Get top-performing campaigns for the organization
 * @access  Private (Admin, Editor)
 */
router.get('/top', hasRole(['admin', 'editor']), validate(getTopCampaignsSchema), getTopCampaignsController);
/**
 * @route   GET /api/crm/campaigns/:id
 * @desc    Get a single campaign by ID
 * @access  Private (Admin, Editor)
 */
router.get('/:id', hasRole(['admin', 'editor']), validate(getCampaignByIdSchema), getCampaignById);
/**
 * @route   PATCH /api/crm/campaigns/:id
 * @desc    Update a campaign
 * @access  Private (Admin, Editor)
 */
router.patch('/:id', hasRole(['admin', 'editor']), validate(updateCampaignSchema), updateCampaign);
/**
 * @route   DELETE /api/crm/campaigns/:id
 * @desc    Delete a campaign
 * @access  Private (Admin only)
 */
router.delete('/:id', hasRole(['admin']), validate(deleteCampaignSchema), deleteCampaign);
/**
 * @route   Nested routes for campaign questions
 * @desc    Mount campaign question routes under /:id/questions
 * @access  Private (Admin, Editor)
 */
router.use('/:id/questions', campaignQuestionRoutes);
/**
 * @route   GET /api/crm/campaigns/:id/page-config
 * @desc    Get campaign page configuration
 * @access  Private (Admin, Editor)
 */
router.get('/:id/page-config', hasRole(['admin', 'editor']), validate(getPageConfigSchema), getCampaignPageConfig);
/**
 * @route   PATCH /api/crm/campaigns/:id/page-config
 * @desc    Update campaign page configuration
 * @access  Private (Admin, Editor)
 */
router.patch('/:id/page-config', hasRole(['admin', 'editor']), validate(updatePageConfigSchema), updateCampaignPageConfig);
/**
 * @route   GET /api/crm/campaigns/:id/with-designations
 * @desc    Get campaign with available designations
 * @access  Private (Admin, Editor)
 */
router.get('/:id/with-designations', hasRole(['admin', 'editor']), validate(getCampaignByIdSchema), getCampaignWithDesignations);
/**
 * @route   PATCH /api/crm/campaigns/:id/designations
 * @desc    Update campaign designations (bulk operation)
 * @access  Private (Admin, Editor)
 */
router.patch('/:id/designations', hasRole(['admin', 'editor']), validate(updateCampaignDesignationsSchema), updateCampaignDesignations);
/**
 * @route   GET /api/crm/campaigns/:id/with-questions
 * @desc    Get campaign with questions
 * @access  Private (Admin, Editor)
 */
router.get('/:id/with-questions', hasRole(['admin', 'editor']), validate(getCampaignByIdSchema), getCampaignWithQuestions);
/**
 * @route   PATCH /api/crm/campaigns/:id/questions
 * @desc    Update campaign questions (bulk operation)
 * @access  Private (Admin, Editor)
 */
router.patch('/:id/questions', hasRole(['admin', 'editor']), validate(updateCampaignQuestionsSchema), updateCampaignQuestions);
/**
 * @route   Nested routes for campaign available designations
 * @desc    Mount campaign available designation routes under /:id/available-designations
 * @access  Private (Admin, Editor)
 */
router.use('/:id/available-designations', campaignAvailableDesignationRoutes);
/**
 * @route   PATCH /api/crm/campaigns/:id/publish
 * @desc    Publish a campaign with validation
 * @access  Private (Admin, Editor)
 */
router.patch('/:id/publish', hasRole(['admin', 'editor']), validate(publishCampaignSchema), publishCampaign);
export default router;
//# sourceMappingURL=campaign.routes.js.map