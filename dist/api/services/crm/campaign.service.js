import { ApiError } from '../../../utils/ApiError.js';
import { removeUndefinedProps } from '../../../utils/removeUndefined.js';
import { CrmCampaignRepository } from '../../repositories/crm/campaign.repository.js';
import { campaignSectionValidation } from '../../../config/campaignSectionValidation.config.js';
import sequelize from '../../../config/database.js';
/**
 * Generates a URL-friendly slug from a title
 * @param title - The title to convert to a slug
 * @returns A URL-friendly slug
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
/**
 * Create a new campaign for staff
 * @param campaignData - The campaign data
 * @param staffSession - The authenticated staff session
 */
export const createCampaignForStaff = async (campaignData, staffSession) => {
    try {
        // Generate a URL-friendly slug from the title if provided and slug is not
        let slug = campaignData.slug;
        if (!slug && campaignData.title) {
            slug = generateSlug(campaignData.title);
        }
        // If still no slug, use the internal name
        if (!slug) {
            slug = generateSlug(campaignData.internalName);
        }
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Prepare campaign data for creation
        const campaignPayload = {
            defaultDesignationId: campaignData.defaultDesignationId,
            internalName: campaignData.internalName,
            externalName: campaignData.externalName,
            slug,
            goalAmount: campaignData.goalAmount,
            icon: campaignData.icon,
            pageConfig: campaignData.pageConfig,
            isActive: campaignData.isActive || false
        };
        const createData = removeUndefinedProps(campaignPayload);
        // Use repository to create campaign (includes automatic organizationId injection)
        const campaign = await campaignRepo.create(createData);
        return campaign;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to create campaign');
    }
};
/**
 * Get all campaigns for the organization with donation statistics
 * @param staffSession - The authenticated staff session
 */
export const getCampaignsForOrg = async (staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to get all campaigns for the organization
        const campaigns = await campaignRepo.findAllForOrg();
        return campaigns;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch campaigns');
    }
};
/**
 * Get a single campaign by ID for staff with donation statistics
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export const getCampaignByIdForStaff = async (id, staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to get campaign (includes authorization check)
        const campaign = await campaignRepo.findById(id);
        if (!campaign) {
            throw new ApiError(404, 'Campaign not found');
        }
        return campaign;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch campaign');
    }
};
/**
 * Update a campaign for staff
 * @param id - The campaign ID
 * @param updateData - The update data
 * @param staffSession - The authenticated staff session
 */
export const updateCampaignForStaff = async (id, updateData, staffSession) => {
    // Start a transaction
    const transaction = await sequelize.transaction();
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Find all image URLs that are actually being used in the saved content
        const usedImageUrls = extractImageUrls(updateData.pageConfig || {});
        // Confirm the images using the repository
        await campaignRepo.confirmImages(usedImageUrls, transaction);
        // Update the campaign using the repository with transaction
        const updatedCampaign = await campaignRepo.update(id, updateData, transaction);
        // Commit the transaction
        await transaction.commit();
        return updatedCampaign;
    }
    catch (error) {
        // Rollback on failure
        await transaction.rollback();
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to update campaign');
    }
};
/**
 * Delete a campaign for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export const deleteCampaignForStaff = async (id, staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to delete campaign (includes authorization check)
        await campaignRepo.delete(id);
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to delete campaign');
    }
};
/**
 * Get campaign page configuration
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export const getCampaignPageConfig = async (id, staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to get campaign (includes authorization check)
        const campaign = await campaignRepo.findById(id);
        if (!campaign) {
            throw new ApiError(404, 'Campaign not found');
        }
        return campaign.pageConfig || null;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch campaign page configuration');
    }
};
/**
 * Update campaign page configuration
 * @param id - The campaign ID
 * @param pageConfig - The new page configuration
 * @param staffSession - The authenticated staff session
 */
export const updateCampaignPageConfig = async (id, pageConfig, staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to update only the pageConfig (includes authorization check)
        const campaign = await campaignRepo.update(id, { pageConfig });
        return campaign;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to update campaign page configuration');
    }
};
/**
 * Get a single campaign by ID with available designations for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export const getCampaignByIdWithDesignationsForStaff = async (id, staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to get campaign with designations (includes authorization check)
        const campaign = await campaignRepo.findByIdWithDesignations(id);
        if (!campaign) {
            throw new ApiError(404, 'Campaign not found');
        }
        return campaign;
    }
    catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch campaign');
    }
};
/**
 * Get a single campaign by ID with questions for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export const getCampaignByIdWithQuestionsForStaff = async (id, staffSession) => {
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Use repository to get campaign with questions (includes authorization check)
        const campaign = await campaignRepo.findByIdWithQuestions(id);
        if (!campaign) {
            throw new ApiError(404, 'Campaign not found');
        }
        return campaign;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch campaign with questions');
    }
};
/**
 * Get top-performing campaigns for the organization
 * @param staffSession - The authenticated staff session
 * @param period - Time period: 'week', 'month', or 'year'
 * @param limit - Maximum number of campaigns to return (default: 3)
 */
export const getTopCampaigns = async (staffSession, period = 'month', limit = 3) => {
    try {
        // Validate period parameter
        if (!['week', 'month', 'year'].includes(period)) {
            throw new ApiError(400, 'Invalid period. Must be one of: week, month, year');
        }
        // Validate limit parameter
        if (limit < 1 || limit > 20) {
            throw new ApiError(400, 'Limit must be between 1 and 20');
        }
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Call repository method
        const topCampaigns = await campaignRepo.findTopCampaigns(period, limit);
        return topCampaigns;
    }
    catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to fetch top campaigns');
    }
};
/**
 * Publish a campaign with validation and transaction support
 * @param id - The campaign ID
 * @param pageConfig - The updated page configuration
 * @param staffSession - The authenticated staff session
 */
export const publishCampaign = async (id, pageConfig, staffSession) => {
    // Start a transaction
    const transaction = await sequelize.transaction();
    try {
        // Create repository instance with staff session for authorization
        const campaignRepo = new CrmCampaignRepository(staffSession);
        // Fetch the campaign to ensure the user is authorized to edit it
        const campaign = await campaignRepo.findById(id);
        if (!campaign) {
            throw new ApiError(404, 'Campaign not found');
        }
        // Perform server-side validation on the pageConfig
        const pageConfigObj = pageConfig;
        const enabledSections = Object.keys(pageConfigObj).filter(sectionKey => pageConfigObj[sectionKey]?.enabled === true);
        // Loop through enabled sections and validate required fields
        for (const sectionKey of enabledSections) {
            const sectionConfig = pageConfigObj[sectionKey];
            const validationRules = campaignSectionValidation[sectionKey];
            if (validationRules && validationRules.requiredFields.length > 0) {
                // Check if all required fields have non-empty values
                for (const requiredField of validationRules.requiredFields) {
                    const fieldValue = sectionConfig?.props?.[requiredField];
                    if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
                        // Capitalize the first letter of the section name for better error message
                        const sectionName = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);
                        throw new ApiError(400, `Cannot publish: The ${sectionName} section is missing a ${requiredField}.`);
                    }
                }
            }
        }
        // Find all image URLs that are actually being used in the published content
        const usedImageUrls = extractImageUrls(pageConfig);
        // Confirm the images using the repository
        await campaignRepo.confirmImages(usedImageUrls, transaction);
        // Update the campaign with the new pageConfig and set is_active: true using the repository
        const updatedCampaign = await campaignRepo.update(id, {
            pageConfig,
            isActive: true
        }, transaction);
        // Commit the transaction
        await transaction.commit();
        return updatedCampaign;
    }
    catch (error) {
        // Rollback the transaction in case of any error
        await transaction.rollback();
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to publish campaign');
    }
};
//helper
const extractImageUrls = (config) => {
    const urls = [];
    const azureBaseUrl = process.env.AZURE_STORAGE_BASE_URL;
    if (!azureBaseUrl) {
        return urls; // Return empty array if no base URL is configured
    }
    const findUrls = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].startsWith(azureBaseUrl)) {
                urls.push(obj[key]);
            }
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                findUrls(obj[key]);
            }
        }
    };
    findUrls(config);
    return urls;
};
//# sourceMappingURL=campaign.service.js.map