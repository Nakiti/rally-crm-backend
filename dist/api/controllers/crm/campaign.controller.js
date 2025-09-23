import { createCampaignForStaff, getCampaignsForOrg, getCampaignByIdForStaff, updateCampaignForStaff, deleteCampaignForStaff, getCampaignPageConfig as getCampaignPageConfigService, updateCampaignPageConfig as updateCampaignPageConfigService, getCampaignByIdWithDesignationsForStaff, getCampaignByIdWithQuestionsForStaff, publishCampaign as publishCampaignService, getTopCampaigns } from '../../services/crm/campaign.service.js';
import { updateCampaignDesignations as updateCampaignDesignationsService } from '../../services/crm/campaignAvailableDesignation.service.js';
import { updateCampaignQuestions as updateCampaignQuestionsService } from '../../services/crm/campaignQuestion.service.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * Create a new campaign for the authenticated staff member's organization
 * POST /api/crm/campaigns
 */
export const createCampaign = async (req, res, next) => {
    try {
        const campaignData = req.body;
        const staffSession = req.user;
        const campaign = await createCampaignForStaff(campaignData, staffSession);
        res.status(201).json({
            success: true,
            data: campaign,
            message: 'Campaign created successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all campaigns for the authenticated staff member's organization
 * GET /api/crm/campaigns
 */
export const getCampaigns = async (req, res, next) => {
    try {
        const staffSession = req.user;
        const campaigns = await getCampaignsForOrg(staffSession);
        res.status(200).json({
            success: true,
            data: campaigns,
            message: 'Campaigns retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get a single campaign by ID for the authenticated staff member
 * GET /api/crm/campaigns/:id
 */
export const getCampaignById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        const campaign = await getCampaignByIdForStaff(id, staffSession);
        res.status(200).json({
            success: true,
            data: campaign,
            message: 'Campaign retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Update a campaign for the authenticated staff member
 * PUT /api/crm/campaigns/:id
 */
export const updateCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        const campaign = await updateCampaignForStaff(id, updateData, staffSession);
        res.status(200).json({
            success: true,
            data: campaign,
            message: 'Campaign updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Delete a campaign for the authenticated staff member
 * DELETE /api/crm/campaigns/:id
 */
export const deleteCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        await deleteCampaignForStaff(id, staffSession);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Campaign deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get campaign page configuration
 * GET /api/crm/campaigns/:id/page-config
 */
export const getCampaignPageConfig = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        const pageConfig = await getCampaignPageConfigService(id, staffSession);
        res.status(200).json({
            success: true,
            data: pageConfig,
            message: 'Campaign page configuration retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Update campaign page configuration
 * PUT /api/crm/campaigns/:id/page-config
 */
export const updateCampaignPageConfig = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { pageConfig } = req.body;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        const campaign = await updateCampaignPageConfigService(id, pageConfig, staffSession);
        res.status(200).json({
            success: true,
            data: campaign,
            message: 'Campaign page configuration updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get campaign with available designations
 * GET /api/crm/campaigns/:id/with-designations
 */
export const getCampaignWithDesignations = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        // Ensure user is a staff member (not a donor)
        if (!('organizationId' in user)) {
            throw new ApiError(403, 'Access denied. Staff authentication required.');
        }
        const campaign = await getCampaignByIdWithDesignationsForStaff(id, user);
        res.status(200).json({
            success: true,
            data: campaign,
            message: 'Campaign with designations retrieved successfully'
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
/**
 * Update campaign designations
 * PATCH /api/crm/campaigns/:id/designations
 */
export const updateCampaignDesignations = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { designationIds } = req.body;
        const user = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        if (!Array.isArray(designationIds)) {
            throw new ApiError(400, 'Designation IDs must be an array');
        }
        // Ensure user is a staff member (not a donor)
        if (!('organizationId' in user)) {
            throw new ApiError(403, 'Access denied. Staff authentication required.');
        }
        const result = await updateCampaignDesignationsService(user, id, designationIds);
        res.status(200).json({
            success: true,
            data: result,
            message: `Campaign designations updated successfully. Added: ${result.added}, Removed: ${result.removed}, Total: ${result.total}`
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get campaign with questions
 * GET /api/crm/campaigns/:id/with-questions
 */
export const getCampaignWithQuestions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        // Ensure user is a staff member (not a donor)
        if (!('organizationId' in user)) {
            throw new ApiError(403, 'Access denied. Staff authentication required.');
        }
        const campaign = await getCampaignByIdWithQuestionsForStaff(id, user);
        res.status(200).json({
            success: true,
            data: campaign,
            message: 'Campaign with questions retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Update campaign questions (bulk operation)
 * PATCH /api/crm/campaigns/:id/questions
 */
export const updateCampaignQuestions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { questions } = req.body;
        const user = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        if (!Array.isArray(questions)) {
            throw new ApiError(400, 'Questions must be an array');
        }
        // Ensure user is a staff member (not a donor)
        if (!('organizationId' in user)) {
            throw new ApiError(403, 'Access denied. Staff authentication required.');
        }
        const result = await updateCampaignQuestionsService(user, id, questions);
        res.status(200).json({
            success: true,
            data: result,
            message: `Campaign questions updated successfully. Added: ${result.added}, Updated: ${result.updated}, Removed: ${result.removed}, Total: ${result.total}`
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get top-performing campaigns for the organization
 * GET /api/crm/campaigns/top
 */
export const getTopCampaignsController = async (req, res, next) => {
    try {
        const staffSession = req.user;
        // Parse query parameters
        const period = req.query.period || 'month';
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 3;
        // Validate period parameter
        if (!['week', 'month', 'year'].includes(period)) {
            res.status(400).json({
                success: false,
                message: 'Invalid period parameter. Must be one of: week, month, year'
            });
            return;
        }
        // Validate limit parameter
        if (isNaN(limit) || limit < 1 || limit > 20) {
            res.status(400).json({
                success: false,
                message: 'Limit must be a number between 1 and 20'
            });
            return;
        }
        const topCampaigns = await getTopCampaigns(staffSession, period, limit);
        res.status(200).json(topCampaigns);
    }
    catch (error) {
        next(error);
    }
};
/**
 * Publish a campaign
 * PATCH /api/crm/campaigns/:id/publish
 */
export const publishCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { pageConfig } = req.body;
        const staffSession = req.user;
        if (!id) {
            throw new ApiError(400, 'Campaign ID is required');
        }
        const campaign = await publishCampaignService(id, pageConfig, staffSession);
        res.status(200).json({
            success: true,
            data: campaign,
            message: 'Campaign published successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=campaign.controller.js.map