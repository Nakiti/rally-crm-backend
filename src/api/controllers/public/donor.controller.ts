import type { Response, NextFunction, Request } from 'express';
import { getDonationHistoryForDonor } from '../../services/public/donor.service.js';
import type { AuthenticatedDonorRequest } from '../../types/express.types.js';
import type { DonorSession } from '../../types/express.types.js';

/**
 * Get donation history for the authenticated donor
 * GET /api/public/donor/donation-history
 */
export const getDonationHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Call the getDonationHistoryForDonor service, passing in the req.user (which is the DonorSession)
    const donationHistory = await getDonationHistoryForDonor(req.user as DonorSession);
    
    res.status(200).json({
      success: true,
      data: donationHistory,
      message: 'Donation history retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};
