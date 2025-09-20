import { OrganizationPage, Organization } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * A repository for handling public-facing organization page data.
 * This repository only returns safe, non-sensitive information.
 */
export class PublicOrganizationPageRepository {
  
  /**
   * Finds an organization page by organization ID and page type.
   * Returns only public information.
   * @param organizationId - The organization's ID
   * @param pageType - The page type
   * @returns Public organization page data or null if not found
   */
  public async findByOrganizationIdAndType(organizationId: string, pageType: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  } | null> {
    try {
      const page = await OrganizationPage.findOne({
        where: { 
          organizationId,
          pageType 
        },
        attributes: ['id', 'organizationId', 'pageType', 'contentConfig', 'createdAt', 'updatedAt'],
      });

      if (!page) {
        return null;
      }

      return {
        id: page.id,
        organizationId: page.organizationId,
        pageType: page.pageType,
        contentConfig: page.contentConfig,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
      };
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch organization page from database.');
    }
  }

  /**
   * Finds an organization page by organization subdomain and page type.
   * Returns only public information.
   * @param subdomain - The organization's subdomain
   * @param pageType - The page type
   * @returns Public organization page data or null if not found
   */
  public async findBySubdomainAndType(subdomain: string, pageType: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  } | null> {
    try {
      const page = await OrganizationPage.findOne({
        where: { pageType },
        include: [
          {
            model: Organization,
            as: 'organization',
            where: { subdomain },
            attributes: [], // We don't need organization data, just for filtering
          }
        ],
        attributes: ['id', 'organizationId', 'pageType', 'contentConfig', 'createdAt', 'updatedAt'],
      });

      if (!page) {
        return null;
      }

      return {
        id: page.id,
        organizationId: page.organizationId,
        pageType: page.pageType,
        contentConfig: page.contentConfig,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
      };
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch organization page from database.');
    }
  }

  /**
   * Finds all organization pages for a specific organization by ID.
   * Returns only public information.
   * @param organizationId - The organization's ID
   * @returns Array of public organization page data
   */
  public async findAllByOrganizationId(organizationId: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  }[]> {
    try {
      const pages = await OrganizationPage.findAll({
        where: { organizationId },
        attributes: ['id', 'organizationId', 'pageType', 'contentConfig', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
      });

      return pages.map(page => ({
        id: page.id,
        organizationId: page.organizationId,
        pageType: page.pageType,
        contentConfig: page.contentConfig,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
      }));
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch organization pages from database.');
    }
  }

  /**
   * Finds all organization pages for a specific organization by subdomain.
   * Returns only public information.
   * @param subdomain - The organization's subdomain
   * @returns Array of public organization page data
   */
  public async findAllBySubdomain(subdomain: string): Promise<{
    id: string;
    organizationId: string;
    pageType: string;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
  }[]> {
    try {
      const pages = await OrganizationPage.findAll({
        where: {},
        include: [
          {
            model: Organization,
            as: 'organization',
            where: { subdomain },
            attributes: [], // We don't need organization data, just for filtering
          }
        ],
        attributes: ['id', 'organizationId', 'pageType', 'contentConfig', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
      });

      return pages.map(page => ({
        id: page.id,
        organizationId: page.organizationId,
        pageType: page.pageType,
        contentConfig: page.contentConfig,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
      }));
    } catch (error: any) {
      throw new ApiError(500, 'Failed to fetch organization pages from database.');
    }
  }
}
