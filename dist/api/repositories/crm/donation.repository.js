import { Donation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { Op } from 'sequelize';
/**
 * A repository for handling CRM donation operations.
 * This repository ensures all queries are scoped to the authenticated staff member's organization.
 */
export class CrmDonationRepository {
    staffSession;
    constructor(staffSession) {
        this.staffSession = staffSession;
    }
    /**
     * Fetches a paginated list of donations for the organization
     * @param filters - Optional filters for pagination and filtering
     * @returns Paginated donations with campaign and donor account details
     */
    async findAllForOrg(filters = {}) {
        try {
            const { page = 1, limit = 20, status, campaignId, designationId, donorEmail, dateFrom, dateTo } = filters;
            // Build where clause with organization scoping
            const whereClause = {
                organizationId: this.staffSession.organizationId
            };
            // Add optional filters
            if (status) {
                whereClause.status = status;
            }
            if (campaignId) {
                whereClause.campaignId = campaignId;
            }
            if (designationId) {
                whereClause.designationId = designationId;
            }
            // Handle date range filtering
            if (dateFrom || dateTo) {
                whereClause.createdAt = {};
                if (dateFrom) {
                    whereClause.createdAt[Op.gte] = dateFrom;
                }
                if (dateTo) {
                    whereClause.createdAt[Op.lte] = dateTo;
                }
            }
            // Build include conditions for donor email filtering
            const includeConditions = [
                {
                    association: 'campaign',
                    attributes: [
                        'id',
                        'internalName',
                        'externalName',
                        'slug',
                        'goalAmount',
                        'icon',
                        'isActive'
                    ]
                },
                {
                    association: 'donorAccount',
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email'
                    ],
                    ...(donorEmail && {
                        where: {
                            email: {
                                [Op.iLike]: `%${donorEmail}%`
                            }
                        }
                    })
                },
                {
                    association: 'designation',
                    attributes: [
                        'id',
                        'name',
                        'description',
                        'goalAmount',
                        'isArchived'
                    ]
                }
            ];
            // Calculate offset for pagination
            const offset = (page - 1) * limit;
            // Fetch donations with pagination
            const { count, rows } = await Donation.findAndCountAll({
                where: whereClause,
                include: includeConditions,
                order: [['createdAt', 'DESC']], // Most recent donations first
                limit: limit,
                offset: offset
            });
            // Transform the results
            const donations = rows.map(donation => ({
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
                    isActive: donation.campaign.isActive
                } : null,
                donorAccount: donation.donorAccount ? {
                    id: donation.donorAccount.id,
                    firstName: donation.donorAccount.firstName,
                    lastName: donation.donorAccount.lastName,
                    email: donation.donorAccount.email
                } : null,
                designation: donation.designation ? {
                    id: donation.designation.id,
                    name: donation.designation.name,
                    description: donation.designation.description,
                    goalAmount: donation.designation.goalAmount,
                    isArchived: donation.designation.isArchived
                } : null
            }));
            // Calculate pagination info
            const totalPages = Math.ceil(count / limit);
            return {
                donations,
                pagination: {
                    page,
                    limit,
                    total: count,
                    totalPages
                }
            };
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch donations from database.');
        }
    }
    /**
     * Fetches recent donations for the organization
     * @param limit - Maximum number of donations to return (default: 5)
     * @returns Array of recent donations with basic details
     */
    async findRecentForOrg(limit = 5) {
        try {
            const donations = await Donation.findAll({
                where: {
                    organizationId: this.staffSession.organizationId,
                    status: 'completed'
                },
                include: [
                    {
                        association: 'campaign',
                        attributes: ['id', 'externalName', 'internalName']
                    },
                    {
                        association: 'donorAccount',
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ],
                order: [['createdAt', 'DESC']],
                limit: limit
            });
            // Transform the results to match the expected format
            return donations.map(donation => ({
                id: donation.id,
                donorName: donation.donorAccount
                    ? `${donation.donorAccount.firstName} ${donation.donorAccount.lastName}`
                    : 'Anonymous',
                campaignName: donation.campaign?.externalName || donation.campaign?.internalName || 'Unknown Campaign',
                amount: donation.amount,
                donatedAt: donation.createdAt
            }));
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch recent donations from database.');
        }
    }
    /**
     * Fetches a single donation by ID, scoped to the organization
     * @param id - The donation ID
     * @returns Single donation with full details including answers
     */
    async findByIdForOrg(id) {
        try {
            const donation = await Donation.findOne({
                where: {
                    id: id,
                    organizationId: this.staffSession.organizationId
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
                            'isActive'
                        ]
                    },
                    {
                        association: 'donorAccount',
                        attributes: [
                            'id',
                            'firstName',
                            'lastName',
                            'email'
                        ]
                    },
                    {
                        association: 'designation',
                        attributes: [
                            'id',
                            'name',
                            'description',
                            'goalAmount',
                            'isArchived'
                        ]
                    },
                    {
                        association: 'answers',
                        include: [
                            {
                                association: 'question',
                                attributes: [
                                    'id',
                                    'questionText',
                                    'questionType',
                                    'options',
                                    'isRequired',
                                    'displayOrder'
                                ]
                            }
                        ]
                    }
                ]
            });
            if (!donation) {
                return null;
            }
            // Transform the result
            return {
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
                    isActive: donation.campaign.isActive
                } : null,
                donorAccount: donation.donorAccount ? {
                    id: donation.donorAccount.id,
                    firstName: donation.donorAccount.firstName,
                    lastName: donation.donorAccount.lastName,
                    email: donation.donorAccount.email
                } : null,
                designation: donation.designation ? {
                    id: donation.designation.id,
                    name: donation.designation.name,
                    description: donation.designation.description,
                    goalAmount: donation.designation.goalAmount,
                    isArchived: donation.designation.isArchived
                } : null,
                answers: donation.answers ? donation.answers
                    .filter(answer => answer.question !== null)
                    .map(answer => ({
                    id: answer.id,
                    answerValue: answer.answerValue,
                    question: {
                        id: answer.question.id,
                        questionText: answer.question.questionText,
                        questionType: answer.question.questionType,
                        options: answer.question.options,
                        isRequired: answer.question.isRequired,
                        displayOrder: answer.question.displayOrder
                    }
                })) : []
            };
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch donation from database.');
        }
    }
}
//# sourceMappingURL=donation.repository.js.map