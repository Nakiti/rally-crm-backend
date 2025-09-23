import { Donation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * A repository for handling donor-specific data operations.
 * This repository ensures all queries are scoped to the authenticated donor's context.
 */
export class PublicDonorRepository {
    donorSession;
    constructor(donorSession) {
        this.donorSession = donorSession;
    }
    /**
     * Fetches all donations for the authenticated donor.
     * Includes associated Campaign and Designation data for a rich history view.
     * @returns Array of donations with campaign and designation details
     */
    async findDonationHistory() {
        try {
            const donations = await Donation.findAll({
                where: {
                    donorAccountId: this.donorSession.donorAccountId,
                },
                include: [
                    {
                        association: 'campaign',
                        attributes: [
                            'id',
                            'internalName',
                            'externalName',
                            'slug',
                            'goalAmount',
                            'icon',
                            'isActive',
                        ],
                    },
                    {
                        association: 'designation',
                        attributes: [
                            'id',
                            'name',
                            'description',
                            'goalAmount',
                            'isArchived',
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']], // Most recent donations first
            });
            return donations.map(donation => ({
                id: donation.id,
                amount: donation.amount,
                status: donation.status,
                stripeChargeId: donation.stripeChargeId,
                createdAt: donation.createdAt,
                updatedAt: donation.updatedAt,
                campaign: donation.campaign ? {
                    id: donation.campaign.id,
                    internalName: donation.campaign.internalName,
                    externalName: donation.campaign.externalName,
                    slug: donation.campaign.slug,
                    goalAmount: donation.campaign.goalAmount,
                    icon: donation.campaign.icon,
                    isActive: donation.campaign.isActive,
                } : null,
                designation: donation.designation ? {
                    id: donation.designation.id,
                    name: donation.designation.name,
                    description: donation.designation.description,
                    goalAmount: donation.designation.goalAmount,
                    isArchived: donation.designation.isArchived,
                } : null,
            }));
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch donation history from database.');
        }
    }
}
//# sourceMappingURL=donor.repository.js.map