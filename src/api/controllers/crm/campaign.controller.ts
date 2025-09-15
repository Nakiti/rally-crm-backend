import type { Request, Response, NextFunction } from 'express';
import {
  createCampaignForStaff,
  getCampaignsForOrg,
  getCampaignByIdForStaff,
  updateCampaignForStaff,
  deleteCampaignForStaff,
  getCampaignPageConfig as getCampaignPageConfigService,
  updateCampaignPageConfig as updateCampaignPageConfigService
} from '../../services/crm/campaign.service.js';
import type { AuthenticatedRequest } from '../../types/express.types.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * Create a new campaign for the authenticated staff member's organization
 * POST /api/crm/campaigns
 */
export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const campaignData = req.body;
    const staffSession = (req as AuthenticatedRequest).user;

    const campaign = await createCampaignForStaff(campaignData, staffSession);
    
    res.status(201).json({
      success: true,
      data: campaign,
      message: 'Campaign created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all campaigns for the authenticated staff member's organization
 * GET /api/crm/campaigns
 */
export const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staffSession = (req as AuthenticatedRequest).user;

    const campaigns = await getCampaignsForOrg(staffSession);
    
    res.status(200).json({
      success: true,
      data: campaigns,
      message: 'Campaigns retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single campaign by ID for the authenticated staff member
 * GET /api/crm/campaigns/:id
 */
export const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const staffSession = (req as AuthenticatedRequest).user;
    if (!id) {
        throw new ApiError(400, 'Campaign ID is required');
    }

    const campaign = await getCampaignByIdForStaff(id, staffSession);



    res.status(200).json({
      success: true,
      data: campaign,
      message: 'Campaign retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a campaign for the authenticated staff member
 * PUT /api/crm/campaigns/:id
 */
export const updateCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const staffSession = (req as AuthenticatedRequest).user;
    if (!id) {
      throw new ApiError(400, 'Campaign ID is required');
    }

    const campaign = await updateCampaignForStaff(id, updateData, staffSession);
    
    res.status(200).json({
      success: true,
      data: campaign,
      message: 'Campaign updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a campaign for the authenticated staff member
 * DELETE /api/crm/campaigns/:id
 */
export const deleteCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const staffSession = (req as AuthenticatedRequest).user;
    if (!id) {
      throw new ApiError(400, 'Campaign ID is required');
    }

    await deleteCampaignForStaff(id, staffSession);
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get campaign page configuration
 * GET /api/crm/campaigns/:id/page-config
 */
export const getCampaignPageConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const staffSession = (req as AuthenticatedRequest).user;
    if (!id) {
      throw new ApiError(400, 'Campaign ID is required');
    }

    const pageConfig = await getCampaignPageConfigService(id, staffSession);
    
    res.status(200).json({
      success: true,
      data: pageConfig,
      message: 'Campaign page configuration retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update campaign page configuration
 * PUT /api/crm/campaigns/:id/page-config
 */
export const updateCampaignPageConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { pageConfig } = req.body;
    const staffSession = (req as AuthenticatedRequest).user;
    if (!id) {
      throw new ApiError(400, 'Campaign ID is required');
    }

    const campaign = await updateCampaignPageConfigService(id, pageConfig, staffSession);
    
    res.status(200).json({
      success: true,
      data: campaign,
      message: 'Campaign page configuration updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
