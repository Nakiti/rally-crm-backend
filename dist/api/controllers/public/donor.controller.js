import { getDonationHistoryForDonor } from '../../services/public/donor.service.js';
/**
 * Get donation history for the authenticated donor
 * GET /api/public/donor/donation-history
 */
export const getDonationHistory = async (req, res, next) => {
    try {
        // Call the getDonationHistoryForDonor service, passing in the req.user (which is the DonorSession)
        const donationHistory = await getDonationHistoryForDonor(req.user);
        res.status(200).json({
            success: true,
            data: donationHistory,
            message: 'Donation history retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=donor.controller.js.map