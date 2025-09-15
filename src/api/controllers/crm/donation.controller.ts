import type { Request, Response, NextFunction } from 'express';
import { CrmDonationService } from '../../services/crm/donation.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { AuthenticatedRequest } from '../../types/express.types.js';

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
    const result = await donationService.getDonationsForOrg((req as AuthenticatedRequest).user, filters);
    
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
    const donation = await donationService.getDonationDetails((req as AuthenticatedRequest).user, id);
    
    res.status(200).json({
      success: true,
      data: donation,
      message: 'Donation details retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};