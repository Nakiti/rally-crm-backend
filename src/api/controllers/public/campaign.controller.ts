import type { Request, Response, NextFunction } from 'express';
import { PublicCampaignService } from '../../services/public/campaign.service.js';
import { ApiError } from '../../../utils/ApiError.js';

// Extend Request interface to include subdomain
interface PublicRequest extends Request {
  subdomain?: string;
}

/**
 * Get a public campaign by slug
 * GET /api/public/campaigns/:slug
 */
export const getPublicCampaign = async (
  req: PublicRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse subdomain from middleware or hostname
    const subdomain = req.subdomain || extractSubdomainFromHost(req.get('host') || '');
    const { slug } = req.params;

    if (!subdomain) {
      throw new ApiError(400, 'Subdomain is required');
    }

    if (!slug) {
      throw new ApiError(400, 'Campaign slug is required');
    }

    // Create service instance and call the service
    const campaignService = new PublicCampaignService();
    const publicCampaign = await campaignService.getPublicCampaignBySlug(subdomain, slug);

    if (!publicCampaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    // Return the public DTO
    res.status(200).json({
      success: true,
      data: publicCampaign,
      message: 'Campaign retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a donation for a campaign
 * POST /api/public/campaigns/:slug/donations
 */
export const createDonation = async (
  req: PublicRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse subdomain and slug
    const subdomain = req.subdomain || extractSubdomainFromHost(req.get('host') || '');
    const { slug } = req.params;
    const donationData = req.body;

    if (!subdomain) {
      throw new ApiError(400, 'Subdomain is required');
    }

    if (!slug) {
      throw new ApiError(400, 'Campaign slug is required');
    }

    // Create service instance and call the createDonationForCampaign service
    const campaignService = new PublicCampaignService();
    const result = await campaignService.createDonationForCampaign(subdomain, slug, donationData);

    res.status(201).json({
      success: true,
      data: { message: result },
      message: 'Donation created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper function to extract subdomain from hostname
 * @param host - The host header from the request
 * @returns The subdomain or empty string if not found
 */
function extractSubdomainFromHost(host: string): string {
  // Remove port if present
  const hostname = host.split(':')[0];
  
  // Split by dots and check if we have a subdomain
  const parts = hostname?.split('.');
  
  // If we have at least 3 parts (subdomain.domain.tld), return the first part
  if (parts && parts.length >= 3) {
    return parts[0] || '';
  }
  
  // For localhost or single domain, return empty string
  return '';
}
