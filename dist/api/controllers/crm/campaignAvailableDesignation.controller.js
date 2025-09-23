import { createCampaignAvailableDesignation as createCampaignAvailableDesignationService, getCampaignAvailableDesignations as getCampaignAvailableDesignationsService, getCampaignAvailableDesignation as getCampaignAvailableDesignationService, deleteCampaignAvailableDesignation as deleteCampaignAvailableDesignationService } from '../../services/crm/campaignAvailableDesignation.service.js';
/**
 * Create a new campaign available designation
 * POST /api/crm/campaigns/:campaignId/available-designations
 */
export const createCampaignAvailableDesignation = async (req, res, next) => {
    try {
        const { campaignId } = req.params;
        const { designationId } = req.body;
        // Validate required fields
        if (!campaignId) {
            res.status(400).json({
                success: false,
                message: 'Campaign ID is required'
            });
            return;
        }
        if (!designationId) {
            res.status(400).json({
                success: false,
                message: 'Designation ID is required'
            });
            return;
        }
        const data = {
            campaignId,
            designationId
        };
        const campaignAvailableDesignation = await createCampaignAvailableDesignationService(req.user, data);
        res.status(201).json({
            success: true,
            data: campaignAvailableDesignation,
            message: 'Campaign available designation created successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all campaign available designations for a specific campaign
 * GET /api/crm/campaigns/:campaignId/available-designations
 */
export const getAllCampaignAvailableDesignations = async (req, res, next) => {
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
        const campaignAvailableDesignations = await getCampaignAvailableDesignationsService(req.user, campaignId);
        res.status(200).json({
            success: true,
            data: campaignAvailableDesignations,
            message: 'Campaign available designations retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get a specific campaign available designation by ID
 * GET /api/crm/campaigns/:campaignId/available-designations/:id
 */
export const getCampaignAvailableDesignation = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Validate required fields
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Campaign available designation ID is required'
            });
            return;
        }
        const campaignAvailableDesignation = await getCampaignAvailableDesignationService(req.user, id);
        res.status(200).json({
            success: true,
            data: campaignAvailableDesignation,
            message: 'Campaign available designation retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Delete a campaign available designation
 * DELETE /api/crm/campaigns/:campaignId/available-designations/:id
 */
export const deleteCampaignAvailableDesignation = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Validate required fields
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Campaign available designation ID is required'
            });
            return;
        }
        const campaignAvailableDesignation = await deleteCampaignAvailableDesignationService(req.user, id);
        res.status(200).json({
            success: true,
            data: campaignAvailableDesignation,
            message: 'Campaign available designation deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=campaignAvailableDesignation.controller.js.map