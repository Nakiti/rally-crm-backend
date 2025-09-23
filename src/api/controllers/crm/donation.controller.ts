import type { Request, Response, NextFunction } from 'express';
import { CrmDonationService } from '../../services/crm/donation.service.js';
import { ApiError } from '../../../utils/ApiError.js';
// import type { AuthenticatedRequest } from '../../types/session.types.js';

/**
 * Get all donations for the organization with optional filtering and pagination
 * GET /api/crm/donations
 */
export const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse query parameters
    const {
      page,
      limit,
      status,
      campaignId,
      designationId,
      donorEmail,
      dateFrom,
      dateTo
    } = req.query;

    // Build filters object
    const filters: any = {};
    
    if (page) filters.page = page;
    if (limit) filters.limit = limit;
    if (status) filters.status = status;
    if (campaignId) filters.campaignId = campaignId;
    if (designationId) filters.designationId = designationId;
    if (donorEmail) filters.donorEmail = donorEmail;
    if (dateFrom) filters.dateFrom = new Date(dateFrom as string);
    if (dateTo) filters.dateTo = new Date(dateTo as string);

    // Create service instance and call the service
    const donationService = new CrmDonationService();
    const result = await donationService.getDonationsForOrg((req).user, filters);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Donations retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent donations for the organization
 * GET /api/crm/donations/recent
 */
export const getRecentDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse limit from query parameters
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;

    // Validate limit parameter
    if (isNaN(limit) || limit < 1 || limit > 50) {
      res.status(400).json({
        success: false,
        message: 'Limit must be a number between 1 and 50'
      });
      return;
    }

    // Create service instance and call the service
    const donationService = new CrmDonationService();
    const recentDonations = await donationService.getRecentDonations((req).user, limit);
    
    res.status(200).json(recentDonations);
  } catch (error) {
    next(error);
  }
};

/**
 * Get detailed information about a specific donation
 * GET /api/crm/donations/:id
 */
export const getDonationDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse donation ID from params
    const { id } = req.params;

    // Validate required fields
    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Donation ID is required'
      });
      return;
    }

    // Create service instance and call the service
    const donationService = new CrmDonationService();
    const donation = await donationService.getDonationDetails((req).user, id);
    
    res.status(200).json({
      success: true,
      data: donation,
      message: 'Donation details retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};