import { CampaignAvailableDesignation, Campaign, Designation } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
/**
 * A repository for handling all database operations for CampaignAvailableDesignations
 * in the context of the CRM. All operations are scoped to the staff member's organization.
 */
export class CrmCampaignAvailableDesignationRepository {
    user;
    constructor(user) {
        this.user = user;
    }
    /**
     * Creates a new campaign available designation within the organization scope
     * @param data - The campaign available designation data
     * @returns The created CampaignAvailableDesignation
     */
    async create(data) {
        try {
            // First verify that the campaign belongs to the organization
            const campaign = await Campaign.findOne({
                where: {
                    id: data.campaignId,
                    organizationId: this.user.organizationId,
                },
            });
            if (!campaign) {
                throw new ApiError(404, 'Campaign not found or does not belong to your organization.');
            }
            // Verify that the designation belongs to the organization
            const designation = await Designation.findOne({
                where: {
                    id: data.designationId,
                    organizationId: this.user.organizationId,
                    isArchived: false,
                },
            });
            if (!designation) {
                throw new ApiError(404, 'Designation not found or does not belong to your organization.');
            }
            // Check if the relationship already exists
            const existing = await CampaignAvailableDesignation.findOne({
                where: {
                    campaignId: data.campaignId,
                    designationId: data.designationId,
                },
            });
            if (existing) {
                throw new ApiError(409, 'This designation is already available for this campaign.');
            }
            const campaignAvailableDesignation = await CampaignAvailableDesignation.create({
                campaignId: data.campaignId,
                designationId: data.designationId,
            });
            return campaignAvailableDesignation;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to create campaign available designation in database.');
        }
    }
    /**
     * Fetches all campaign available designations for a specific campaign within the organization scope
     * @param campaignId - The campaign ID
     * @returns Array of campaign available designations with designation details
     */
    async findAllForCampaign(campaignId) {
        try {
            // First verify that the campaign belongs to the organization
            const campaign = await Campaign.findOne({
                where: {
                    id: campaignId,
                    organizationId: this.user.organizationId,
                },
            });
            if (!campaign) {
                throw new ApiError(404, 'Campaign not found or does not belong to your organization.');
            }
            const campaignAvailableDesignations = await CampaignAvailableDesignation.findAll({
                where: {
                    campaignId: campaignId,
                },
                include: [
                    {
                        model: Designation,
                        as: 'designation',
                        where: {
                            isArchived: false, // Only include non-archived designations
                        },
                        required: true,
                    },
                ],
                order: [['createdAt', 'DESC']], // Most recent first
            });
            return campaignAvailableDesignations;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch campaign available designations from database.');
        }
    }
    /**
     * Fetches a single campaign available designation by ID within the organization scope
     * @param id - The campaign available designation ID
     * @returns The campaign available designation or null if not found
     */
    async findByIdForOrg(id) {
        try {
            const campaignAvailableDesignation = await CampaignAvailableDesignation.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Campaign,
                        as: 'campaign',
                        where: {
                            organizationId: this.user.organizationId, // Ensure tenancy
                        },
                        required: true,
                    },
                    {
                        model: Designation,
                        as: 'designation',
                        where: {
                            organizationId: this.user.organizationId, // Ensure tenancy
                        },
                        required: true,
                    },
                ],
            });
            return campaignAvailableDesignation;
        }
        catch (error) {
            throw new ApiError(500, 'Failed to fetch campaign available designation from database.');
        }
    }
    /**
     * Deletes a campaign available designation within the organization scope
     * @param id - The campaign available designation ID
     * @returns The deleted CampaignAvailableDesignation
     */
    async delete(id) {
        try {
            // First find the campaign available designation using tenancy checks
            const campaignAvailableDesignation = await this.findByIdForOrg(id);
            if (!campaignAvailableDesignation) {
                throw new ApiError(404, 'Campaign available designation not found.');
            }
            // Delete the campaign available designation
            await campaignAvailableDesignation.destroy();
            return campaignAvailableDesignation;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to delete campaign available designation from database.');
        }
    }
    /**
     * Bulk creates campaign available designations within the organization scope
     * @param campaignId - The campaign ID
     * @param designationIds - Array of designation IDs to create
     * @returns Array of created CampaignAvailableDesignations
     */
    async bulkCreate(campaignId, designationIds) {
        try {
            // First verify that the campaign belongs to the organization
            const campaign = await Campaign.findOne({
                where: {
                    id: campaignId,
                    organizationId: this.user.organizationId,
                },
            });
            if (!campaign) {
                throw new ApiError(404, 'Campaign not found or does not belong to your organization.');
            }
            // Verify that all designations belong to the organization and are not archived
            const designations = await Designation.findAll({
                where: {
                    id: designationIds,
                    organizationId: this.user.organizationId,
                    isArchived: false,
                },
            });
            if (designations.length !== designationIds.length) {
                throw new ApiError(404, 'One or more designations not found or do not belong to your organization.');
            }
            // Check for existing relationships to avoid duplicates
            const existing = await CampaignAvailableDesignation.findAll({
                where: {
                    campaignId: campaignId,
                    designationId: designationIds,
                },
            });
            if (existing.length > 0) {
                const existingIds = existing.map(e => e.designationId);
                throw new ApiError(409, `The following designations are already available for this campaign: ${existingIds.join(', ')}`);
            }
            // Create all the relationships
            const createData = designationIds.map(designationId => ({
                campaignId,
                designationId,
            }));
            const campaignAvailableDesignations = await CampaignAvailableDesignation.bulkCreate(createData);
            return campaignAvailableDesignations;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to bulk create campaign available designations in database.');
        }
    }
    /**
     * Bulk deletes campaign available designations by designation IDs within the organization scope
     * @param campaignId - The campaign ID
     * @param designationIds - Array of designation IDs to remove
     * @returns Number of deleted records
     */
    async bulkDeleteByDesignationIds(campaignId, designationIds) {
        try {
            // First verify that the campaign belongs to the organization
            const campaign = await Campaign.findOne({
                where: {
                    id: campaignId,
                    organizationId: this.user.organizationId,
                },
            });
            if (!campaign) {
                throw new ApiError(404, 'Campaign not found or does not belong to your organization.');
            }
            // Delete the relationships
            const deletedCount = await CampaignAvailableDesignation.destroy({
                where: {
                    campaignId: campaignId,
                    designationId: designationIds,
                },
            });
            return deletedCount;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to bulk delete campaign available designations from database.');
        }
    }
    /**
     * Gets current designation IDs for a campaign within the organization scope
     * @param campaignId - The campaign ID
     * @returns Array of current designation IDs
     */
    async getCurrentDesignationIds(campaignId) {
        try {
            // First verify that the campaign belongs to the organization
            const campaign = await Campaign.findOne({
                where: {
                    id: campaignId,
                    organizationId: this.user.organizationId,
                },
            });
            if (!campaign) {
                throw new ApiError(404, 'Campaign not found or does not belong to your organization.');
            }
            // Get current designation IDs
            const currentDesignations = await CampaignAvailableDesignation.findAll({
                where: {
                    campaignId: campaignId,
                },
                attributes: ['designationId'],
                raw: true,
            });
            return currentDesignations.map(d => d.designationId);
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, 'Failed to fetch current designation IDs from database.');
        }
    }
}
//# sourceMappingURL=campaignAvailableDesignation.repository.js.map