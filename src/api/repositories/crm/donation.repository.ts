import { Donation, Campaign, DonorAccount, Designation, DonationAnswer, CampaignQuestion } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffSession } from '../../types/session.types.js';
import { Op } from 'sequelize';

// Interface for pagination filters
interface PaginationFilters {
  page?: number;
  limit?: number;
  status?: string;
  campaignId?: string;
  designationId?: string;
  donorEmail?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Interface for paginated results
interface PaginatedDonations {
  donations: Array<{
    id: string;
    amount: number;
    status: string;
    stripeChargeId: string | null;
    createdAt: Date;
    updatedAt: Date;
    campaign: {
      id: string;
      internalName: string;
      externalName: string | null;
      slug: string;
      goalAmount: number | null;
      icon: string | null;
      isActive: boolean;
    } | null;
    donorAccount: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } | null;
    designation: {
      id: string;
      name: string;
      description: string | null;
      goalAmount: number | null;
      isArchived: boolean;
    } | null;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * A repository for handling CRM donation operations.
 * This repository ensures all queries are scoped to the authenticated staff member's organization.
 */
export class CrmDonationRepository {
  private staffSession: StaffSession;

  constructor(staffSession: StaffSession) {
    this.staffSession = staffSession;
  }

  /**
   * Fetches a paginated list of donations for the organization
   * @param filters - Optional filters for pagination and filtering
   * @returns Paginated donations with campaign and donor account details
   */
  public async findAllForOrg(filters: PaginationFilters = {}): Promise<PaginatedDonations> {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        campaignId,
        designationId,
        donorEmail,
        dateFrom,
        dateTo
      } = filters;

      // Build where clause with organization scoping
      const whereClause: any = {
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
      const includeConditions: any[] = [
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
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch donations from database.');
    }
  }

  /**
   * Fetches a single donation by ID, scoped to the organization
   * @param id - The donation ID
   * @returns Single donation with full details including answers
   */
  public async findByIdForOrg(id: string): Promise<{
    id: string;
    amount: number;
    status: string;
    stripeChargeId: string | null;
    createdAt: Date;
    updatedAt: Date;
    campaign: {
      id: string;
      internalName: string;
      externalName: string | null;
      slug: string;
      goalAmount: number | null;
      icon: string | null;
      isActive: boolean;
    } | null;
    donorAccount: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } | null;
    designation: {
      id: string;
      name: string;
      description: string | null;
      goalAmount: number | null;
      isArchived: boolean;
    } | null;
    answers: Array<{
      id: string;
      answerValue: string;
      question: {
        id: string;
        questionText: string;
        questionType: string;
        options: any;
        isRequired: boolean;
        displayOrder: number;
      };
    }>;
  } | null> {
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
              id: answer.question!.id,
              questionText: answer.question!.questionText,
              questionType: answer.question!.questionType,
              options: answer.question!.options,
              isRequired: answer.question!.isRequired,
              displayOrder: answer.question!.displayOrder
            }
          })) : []
      };
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch donation from database.');
    }
  }
}
