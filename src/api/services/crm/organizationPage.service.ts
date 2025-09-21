import { OrganizationPage } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { removeUndefinedProps } from '../../../utils/removeUndefined.js';
import { CrmOrganizationPageRepository } from '../../repositories/crm/organizationPage.repository.js';
import type { StaffSession } from '../../types/session.types.js';
import { websitePageEditorConfig } from '../../../config/websitePageEditor.config.js';
import { websiteSectionDefaults } from '../../../config/websiteSectionDefaults.config.js';

interface CreateOrganizationPageData {
  pageType: string;
  contentConfig?: object;
}

interface UpdateOrganizationPageData {
  pageType?: string;
  contentConfig?: object;
  isPublished?: boolean;
}

/**
 * Create a new organization page for staff
 * @param pageData - The organization page data
 * @param staffSession - The authenticated staff session
 */
export const createOrganizationPageForStaff = async (
  pageData: CreateOrganizationPageData,
  staffSession: StaffSession
): Promise<OrganizationPage> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to create organization page (includes automatic organizationId injection)
    const page = await pageRepo.create({
      pageType: pageData.pageType,
      ...(pageData.contentConfig && { contentConfig: pageData.contentConfig })
    });
    return page;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to create organization page');
  }
};

/**
 * Get all organization pages for the organization
 * @param staffSession - The authenticated staff session
 */
export const getOrganizationPagesForOrg = async (staffSession: StaffSession): Promise<OrganizationPage[]> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to get all organization pages for the organization
    const pages = await pageRepo.findAllForOrg();
    return pages;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch organization pages');
  }
};

/**
 * Get a single organization page by ID for staff
 * @param id - The organization page ID
 * @param staffSession - The authenticated staff session
 */
export const getOrganizationPageByIdForStaff = async (
  id: string,
  staffSession: StaffSession
): Promise<OrganizationPage> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to get organization page (includes authorization check)
    const page = await pageRepo.findById(id);
    
    if (!page) {
      throw new ApiError(404, 'Organization page not found');
    }
    
    return page;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch organization page');
  }
};

/**
 * Get a single organization page by page type for staff
 * @param pageType - The page type
 * @param staffSession - The authenticated staff session
 */
export const getOrganizationPageByTypeForStaff = async (
  pageType: string,
  staffSession: StaffSession
): Promise<OrganizationPage> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to get organization page by type (includes authorization check)
    const page = await pageRepo.findByPageType(pageType);
    
    if (!page) {
      throw new ApiError(404, 'Organization page not found');
    }
    
    return page;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch organization page');
  }
};

/**
 * Update an organization page for staff
 * @param id - The organization page ID
 * @param updateData - The update data
 * @param staffSession - The authenticated staff session
 */
export const updateOrganizationPageForStaff = async (
  id: string,
  updateData: UpdateOrganizationPageData,
  staffSession: StaffSession
): Promise<OrganizationPage> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to update organization page (includes authorization check)
    const page = await pageRepo.update(id, updateData);
    return page;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to update organization page');
  }
};

/**
 * Delete an organization page for staff
 * @param id - The organization page ID
 * @param staffSession - The authenticated staff session
 */
export const deleteOrganizationPageForStaff = async (
  id: string,
  staffSession: StaffSession
): Promise<void> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to delete organization page (includes authorization check)
    await pageRepo.delete(id);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to delete organization page');
  }
};

/**
 * Get organization page content configuration
 * @param id - The organization page ID
 * @param staffSession - The authenticated staff session
 */
export const getOrganizationPageContentConfig = async (
  id: string,
  staffSession: StaffSession
): Promise<object | null> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to get organization page (includes authorization check)
    const page = await pageRepo.findById(id);
    
    if (!page) {
      throw new ApiError(404, 'Organization page not found');
    }
    
    return page.contentConfig || null;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to fetch organization page content configuration');
  }
};

/**
 * Update organization page content configuration
 * @param id - The organization page ID
 * @param contentConfig - The new content configuration
 * @param staffSession - The authenticated staff session
 */
export const updateOrganizationPageContentConfig = async (
  id: string,
  contentConfig: object,
  staffSession: StaffSession
): Promise<OrganizationPage> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // Use repository to update only the contentConfig (includes authorization check)
    const page = await pageRepo.update(id, { contentConfig });
    return page;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to update organization page content configuration');
  }
};

/**
 * Publish organization page - updates content config and sets is_published to true
 * @param pageSlug - The page slug (pageType)
 * @param contentConfig - The new content configuration
 * @param staffSession - The authenticated staff session
 */
export const publishOrganizationPage = async (
  pageSlug: string,
  contentConfig: object,
  staffSession: StaffSession
): Promise<OrganizationPage> => {
  try {
    // Create repository instance with staff session for authorization
    const pageRepo = new CrmOrganizationPageRepository(staffSession);
    
    // First find the page by pageType (slug)
    const page = await pageRepo.findByPageType(pageSlug);
    
    if (!page) {
      throw new ApiError(404, 'Organization page not found');
    }
    
    // Update both contentConfig and set isPublished to true
    const updatedPage = await pageRepo.update(page.id, { 
      contentConfig,
      isPublished: true 
    });
    
    return updatedPage;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to publish organization page');
  }
};

/**
 * Automatically create default organization pages for a new organization
 * This function is called during organization creation and doesn't require user authentication
 * @param organizationId - The ID of the organization to create pages for
 */
export const createDefaultOrganizationPages = async (organizationId: string): Promise<OrganizationPage[]> => {
  try {
    const createdPages: OrganizationPage[] = [];
    
    // Map the config page types to database page types
    const pageTypeMapping = {
      'landing-page': 'landing',
      'about-page': 'about'
    } as const;
    
    // Get the list of required pages from the website page editor config
    const requiredPages = Object.keys(websitePageEditorConfig) as Array<keyof typeof websitePageEditorConfig>;
    
    // Loop through each required page type and create it
    for (const configPageType of requiredPages) {
      const pageConfig = websitePageEditorConfig[configPageType];
      const dbPageType = pageTypeMapping[configPageType];
      
      // Build the default sections for this page using the availableSections and sectionDefaults
      const defaultSections = pageConfig.availableSections.map(sectionType => {
        // Get the default configuration for this section type from websiteSectionDefaults
        const sectionDefault = websiteSectionDefaults[sectionType as keyof typeof websiteSectionDefaults];
        return sectionDefault;
      });
      
      // Create the page with default sections from the config
      const page = await OrganizationPage.create({
        organizationId,
        pageType: dbPageType,
        contentConfig: {
          sections: defaultSections
        }
      } as any);
      
      createdPages.push(page);
    }
    
    return createdPages;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Failed to create default organization pages');
  }
};
