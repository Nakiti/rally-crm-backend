import { Campaign } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { removeUndefinedProps } from '../../../utils/removeUndefined.js';
import { CrmCampaignRepository } from '../../repositories/crm/campaign.repository.js';
import type { StaffSession } from '../../types/express.types.js';
import type { CampaignCreationAttributes } from '../../../models/campaign.model.js';

interface CreateCampaignData {
  defaultDesignationId?: string;
  internalName: string;
  externalName?: string;
  title?: string; // Used for slug generation if provided
  slug?: string; // Optional slug, will be generated from title if not provided
  goalAmount?: number;
  icon?: string;
  pageConfig?: object;
  isActive?: boolean;
}

interface UpdateCampaignData {
  defaultDesignationId?: string;
  internalName?: string;
  externalName?: string;
  slug?: string;
  goalAmount?: number;
  icon?: string;
  pageConfig?: object;
  isActive?: boolean;
}

/**
 * Generates a URL-friendly slug from a title
 * @param title - The title to convert to a slug
 * @returns A URL-friendly slug
 */
function generateSlug(title: string): string {
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
export const createCampaignForStaff = async (
  campaignData: CreateCampaignData,
  staffSession: StaffSession
): Promise<Campaign> => {
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

    const createData = removeUndefinedProps(campaignPayload) as CampaignCreationAttributes;

    // Use repository to create campaign (includes automatic organizationId injection)
    const campaign = await campaignRepo.create(createData);
    return campaign;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to create campaign');
  }
};

/**
 * Get all campaigns for the organization
 * @param staffSession - The authenticated staff session
 */
export const getCampaignsForOrg = async (staffSession: StaffSession): Promise<Campaign[]> => {
  try {
    // Create repository instance with staff session for authorization
    const campaignRepo = new CrmCampaignRepository(staffSession);
    
    // Use repository to get all campaigns for the organization
    const campaigns = await campaignRepo.findAllForOrg();
    return campaigns;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch campaigns');
  }
};

/**
 * Get a single campaign by ID for staff
 * @param id - The campaign ID
 * @param staffSession - The authenticated staff session
 */
export const getCampaignByIdForStaff = async (
  id: string,
  staffSession: StaffSession
): Promise<Campaign> => {
  try {
    // Create repository instance with staff session for authorization
    const campaignRepo = new CrmCampaignRepository(staffSession);
    
    // Use repository to get campaign (includes authorization check)
    const campaign = await campaignRepo.findById(id);
    
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }
    
    return campaign;
  } catch (error) {
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
export const updateCampaignForStaff = async (
  id: string,
  updateData: UpdateCampaignData,
  staffSession: StaffSession
): Promise<Campaign> => {
  try {
    // Create repository instance with staff session for authorization
    const campaignRepo = new CrmCampaignRepository(staffSession);
    
    // Use repository to update campaign (includes authorization check)
    const campaign = await campaignRepo.update(id, updateData);
    return campaign;
  } catch (error) {
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
export const deleteCampaignForStaff = async (
  id: string,
  staffSession: StaffSession
): Promise<void> => {
  try {
    // Create repository instance with staff session for authorization
    const campaignRepo = new CrmCampaignRepository(staffSession);
    
    // Use repository to delete campaign (includes authorization check)
    await campaignRepo.delete(id);
  } catch (error) {
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
export const getCampaignPageConfig = async (
  id: string,
  staffSession: StaffSession
): Promise<object | null> => {
  try {
    // Create repository instance with staff session for authorization
    const campaignRepo = new CrmCampaignRepository(staffSession);
    
    // Use repository to get campaign (includes authorization check)
    const campaign = await campaignRepo.findById(id);
    
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }
    
    return campaign.pageConfig;
  } catch (error) {
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
export const updateCampaignPageConfig = async (
  id: string,
  pageConfig: object,
  staffSession: StaffSession
): Promise<Campaign> => {
  try {
    // Create repository instance with staff session for authorization
    const campaignRepo = new CrmCampaignRepository(staffSession);
    
    // Use repository to update only the pageConfig (includes authorization check)
    const campaign = await campaignRepo.update(id, { pageConfig });
    return campaign;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to update campaign page configuration');
  }
};
