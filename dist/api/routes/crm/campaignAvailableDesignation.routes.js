import { Router } from 'express';
import { createCampaignAvailableDesignation, getAllCampaignAvailableDesignations, getCampaignAvailableDesignation, deleteCampaignAvailableDesignation } from '../../controllers/crm/campaignAvailableDesignation.controller.js';
import { validate } from '../../middleware/validate.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { hasRole } from '../../middleware/hasRole.js';
import { createCampaignAvailableDesignationSchema, getCampaignAvailableDesignationsSchema, getCampaignAvailableDesignationSchema, deleteCampaignAvailableDesignationSchema } from './campaignAvailableDesignation.schemas.js';
const router = Router();
/**
 * @route   POST /api/crm/campaigns/:campaignId/available-designations
 * @desc    Create a new campaign available designation
 * @access  Private (Admin/Editor)
 */
router.post('/', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(createCampaignAvailableDesignationSchema), createCampaignAvailableDesignation);
/**
 * @route   GET /api/crm/campaigns/:campaignId/available-designations
 * @desc    Get all campaign available designations for a specific campaign
 * @access  Private (Admin/Editor)
 */
router.get('/', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(getCampaignAvailableDesignationsSchema), getAllCampaignAvailableDesignations);
/**
 * @route   GET /api/crm/campaigns/:campaignId/available-designations/:id
 * @desc    Get a specific campaign available designation by ID
 * @access  Private (Admin/Editor)
 */
router.get('/:id', isStaffAuthenticated, hasRole(['admin', 'editor']), validate(getCampaignAvailableDesignationSchema), getCampaignAvailableDesignation);
/**
 * @route   DELETE /api/crm/campaigns/:campaignId/available-designations/:id
 * @desc    Delete a campaign available designation
 * @access  Private (Admin only)
 */
router.delete('/:id', isStaffAuthenticated, hasRole(['admin']), validate(deleteCampaignAvailableDesignationSchema), deleteCampaignAvailableDesignation);
export default router;
//# sourceMappingURL=campaignAvailableDesignation.routes.js.map