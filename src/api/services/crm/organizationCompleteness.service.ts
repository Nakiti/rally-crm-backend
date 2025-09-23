import { Organization, OrganizationPage } from '../../../models/index.js';
import { ApiError } from '../../../utils/ApiError.js';
import { websitePageEditorConfig } from '../../../config/websitePageEditor.config.js';

/**
 * Service for checking organization completeness and setting public status
 */
export class OrganizationCompletenessService {
  
  /**
   * Check and set organization public status based on completeness criteria
   * @param organizationId - The organization ID to check
   * @returns Promise<boolean> - The new isPubliclyActive status
   */
  public static async checkAndSetOrganizationPublicStatus(organizationId: string): Promise<boolean> {
    try {
      // 1. Fetch the organization and its related pages
      const organization = await Organization.findByPk(organizationId, {
        include: [
          {
            model: OrganizationPage,
            as: 'pages'
          }
        ]
      });

      if (!organization) {
        throw new ApiError(404, 'Organization not found');
      }

      // 2. Check Stripe account verification
      const stripeAccountVerified = await this.checkStripeAccountVerification(organization.stripeAccountId);

      // 3. Check required pages publication status
      const requiredPagesPublished = await this.checkRequiredPagesPublished(organization.pages || []);

      // 4. Optional: Check active subscription (TODO: implement when subscription system is ready)
      // const hasActiveSubscription = await this.checkActiveSubscription(organizationId);

      // 5. Determine if organization should be publicly active
      const shouldBePubliclyActive = stripeAccountVerified && requiredPagesPublished;

      // 6. Update organization's isPubliclyActive flag if it has changed
      if (organization.isPubliclyActive !== shouldBePubliclyActive) {
        await organization.update({ isPubliclyActive: shouldBePubliclyActive });
      }

      return shouldBePubliclyActive;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to check organization completeness');
    }
  }

  /**
   * Check if Stripe account is verified
   * @param stripeAccountId - The Stripe account ID
   * @returns Promise<boolean> - Whether the Stripe account is verified
   */
  private static async checkStripeAccountVerification(stripeAccountId?: string): Promise<boolean> {
    // TODO: Implement Stripe API integration to check account verification
    // For now, just check if stripeAccountId exists
    if (!stripeAccountId) {
      return false;
    }

    // TODO: Add actual Stripe API call to verify account status
    // Example:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const account = await stripe.accounts.retrieve(stripeAccountId);
    // return account.charges_enabled && account.payouts_enabled;

    // Placeholder: assume account is verified if it exists
    return true;
  }

  /**
   * Check if all required organization pages are published
   * @param pages - Array of organization pages
   * @returns Promise<boolean> - Whether all required pages are published
   */
  private static async checkRequiredPagesPublished(pages: OrganizationPage[]): Promise<boolean> {
    // Get required page types from website page editor config
    const requiredPageTypes = Object.keys(websitePageEditorConfig) as Array<keyof typeof websitePageEditorConfig>;
    
    // Map config page types to database page types
    const pageTypeMapping = {
      'landing-page': 'landing',
      'about-page': 'about'
    } as const;

    // Check if all required pages exist and are published
    for (const configPageType of requiredPageTypes) {
      const dbPageType = pageTypeMapping[configPageType];
      const page = pages.find(p => p.pageType === dbPageType);
      
      if (!page || !page.isPublished) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if organization has an active subscription
   * @param organizationId - The organization ID
   * @returns Promise<boolean> - Whether the organization has an active subscription
   */
  private static async checkActiveSubscription(organizationId: string): Promise<boolean> {
    // TODO: Implement subscription check when subscription system is ready
    // This could check against a subscriptions table or external service
    return true; // Placeholder: assume all organizations have active subscriptions
  }

  /**
   * Get organization completeness status details
   * @param organizationId - The organization ID to check
   * @returns Promise<object> - Detailed completeness status
   */
  public static async getOrganizationCompletenessStatus(organizationId: string): Promise<{
    isPubliclyActive: boolean;
    stripeAccountVerified: boolean;
    requiredPagesPublished: boolean;
    hasActiveSubscription: boolean;
    missingRequirements: string[];
  }> {
    try {
      const organization = await Organization.findByPk(organizationId, {
        include: [
          {
            model: OrganizationPage,
            as: 'pages'
          }
        ]
      });

      if (!organization) {
        throw new ApiError(404, 'Organization not found');
      }

      const stripeAccountVerified = await this.checkStripeAccountVerification(organization.stripeAccountId);
      const requiredPagesPublished = await this.checkRequiredPagesPublished(organization.pages || []);
      const hasActiveSubscription = await this.checkActiveSubscription(organizationId);

      const missingRequirements: string[] = [];
      
      if (!stripeAccountVerified) {
        missingRequirements.push('Stripe account not verified');
      }
      
      if (!requiredPagesPublished) {
        missingRequirements.push('Required pages not published');
      }
      
      if (!hasActiveSubscription) {
        missingRequirements.push('No active subscription');
      }

      return {
        isPubliclyActive: organization.isPubliclyActive,
        stripeAccountVerified,
        requiredPagesPublished,
        hasActiveSubscription,
        missingRequirements
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to get organization completeness status');
    }
  }
}
