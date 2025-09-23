import { OrganizationPage } from '../../../models/index.js';
import { ImageUpload } from '../../../models/imageUpload.model.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffSession } from '../../types/session.types.js';
import { Op, Transaction } from 'sequelize';

/**
 * A repository for handling all database operations for OrganizationPages
 * in the context of the CRM.
 */
export class CrmOrganizationPageRepository {
  private user: StaffSession | null;

  /**
   * Constructor accepts a StaffSession object to establish the security context.
   * @param user - The authenticated staff member's session data
   */
  constructor(user: StaffSession | null = null) {
    this.user = user;
  }

  /**
   * Creates a new OrganizationPage.
   * Must automatically inject the organizationId from the user session.
   * @param pageData - The data for the new organization page
   */
  public async create(pageData: {
    pageType: string;
    contentConfig?: object;
  }): Promise<OrganizationPage> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Automatically inject the organizationId from the user session
      const newPage = await OrganizationPage.create({
        ...pageData,
        organizationId: this.user.organizationId
      } as any);
      return newPage;
    } catch (error: any) {
      // Handle potential database errors
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiError(409, 'An organization page of this type already exists.');
      }
      // For any other database error, throw a generic server error
      throw new ApiError(500, 'Failed to create organization page in database.');
    }
  }

  /**
   * Fetches a single OrganizationPage.
   * The WHERE clause must check for both the id AND the organizationId from the user session to ensure tenancy.
   * @param id - The organization page ID
   */
  public async findById(id: string): Promise<OrganizationPage | null> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find organization page with both id and organizationId to ensure tenancy
      const page = await OrganizationPage.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        }
      });
      return page;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch organization page from database.');
    }
  }

  /**
   * Fetches a single OrganizationPage by page type.
   * The WHERE clause must check for both the pageType AND the organizationId from the user session to ensure tenancy.
   * @param pageType - The page type
   */
  public async findByPageType(pageType: string): Promise<OrganizationPage | null> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find organization page with both pageType and organizationId to ensure tenancy
      const page = await OrganizationPage.findOne({
        where: {
          pageType,
          organizationId: this.user.organizationId
        }
      });
      return page;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch organization page from database.');
    }
  }

  /**
   * Fetches all organization pages.
   * The WHERE clause must be scoped to the organizationId from the user session.
   */
  public async findAllForOrg(): Promise<OrganizationPage[]> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find all organization pages for the organization
      const pages = await OrganizationPage.findAll({
        where: {
          organizationId: this.user.organizationId
        },
        order: [['createdAt', 'DESC']]
      });
      return pages;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch organization pages from database.');
    }
  }

  /**
   * Updates an organization page.
   * Must first find the page using both id and organizationId to ensure the user has permission to edit it.
   * @param id - The organization page ID
   * @param updateData - The data to update
   * @param transaction - Optional transaction to use for the operation
   */
  public async update(id: string, updateData: {
    pageType?: string;
    contentConfig?: object;
    isPublished?: boolean;
  }, transaction?: Transaction): Promise<OrganizationPage> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find the organization page using both id and organizationId to ensure permission
      const findOptions: any = {
        where: {
          id,
          organizationId: this.user.organizationId
        }
      };
      
      if (transaction) {
        findOptions.transaction = transaction;
      }
      
      const page = await OrganizationPage.findOne(findOptions);

      if (!page) {
        throw new ApiError(404, 'Organization page not found or access denied.');
      }

      // If pageType is being updated, check for uniqueness within the organization
      if (updateData.pageType && updateData.pageType !== page.pageType) {
        const existingFindOptions: any = {
          where: {
            pageType: updateData.pageType,
            organizationId: this.user.organizationId,
            id: { [Op.ne]: id }
          }
        };
        
        if (transaction) {
          existingFindOptions.transaction = transaction;
        }
        
        const existingPage = await OrganizationPage.findOne(existingFindOptions);

        if (existingPage) {
          throw new ApiError(409, 'An organization page of this type already exists in your organization.');
        }
      }

      // Update the organization page
      const updateOptions: any = {};
      if (transaction) {
        updateOptions.transaction = transaction;
      }
      await page.update(updateData, updateOptions);
      return page;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiError(409, 'An organization page of this type already exists in your organization.');
      }
      throw new ApiError(500, 'Failed to update organization page in database.');
    }
  }

  /**
   * Deletes an organization page.
   * Must first find the page using both id and organizationId.
   * @param id - The organization page ID
   */
  public async delete(id: string): Promise<void> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    try {
      // Find the organization page using both id and organizationId to ensure permission
      const page = await OrganizationPage.findOne({
        where: {
          id,
          organizationId: this.user.organizationId
        }
      });

      if (!page) {
        throw new ApiError(404, 'Organization page not found or access denied.');
      }

      // Delete the organization page
      await page.destroy();
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete organization page from database.');
    }
  }

  /**
   * Confirms image uploads by updating their status from 'pending' to 'confirmed'.
   * This prevents the cleanup job from deleting these images.
   * @param imageUrls - Array of image URLs to confirm
   * @param transaction - Optional transaction to use for the operation
   */
  public async confirmImages(imageUrls: string[], transaction?: Transaction): Promise<void> {
    // Check if the repository was initialized with a user context
    if (!this.user || !this.user.organizationId) {
      throw new ApiError(500, 'Repository must be initialized with a user context for this operation.');
    }

    if (imageUrls.length === 0) {
      return; // No images to confirm
    }

    try {
      const imageUpdateOptions: any = {
        where: {
          url: imageUrls,
          organizationId: this.user.organizationId,
        }
      };
      
      if (transaction) {
        imageUpdateOptions.transaction = transaction;
      }
      
      await ImageUpload.update(
        { status: 'confirmed' },
        imageUpdateOptions
      );
    } catch (error) {
      throw new ApiError(500, 'Failed to confirm images in database.');
    }
  }
}
