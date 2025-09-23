import type { Request, Response, NextFunction } from 'express';
import { OrganizationCompletenessService } from '../../services/crm/organizationCompleteness.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { AuthenticatedRequest } from '../../types/express.types.js';
import type { StaffSession } from '../../types/session.types.js';

/**
 * Check and update organization completeness status
 * POST /api/crm/organizations/current/check-completeness
 */
export const checkOrganizationCompleteness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staffSession = (req as AuthenticatedRequest).user as StaffSession;

    if (!staffSession.organizationId) {
      throw new ApiError(400, 'User is not associated with any organization');
    }

    const isPubliclyActive = await OrganizationCompletenessService.checkAndSetOrganizationPublicStatus(staffSession.organizationId);

    res.status(200).json({
      success: true,
      data: {
        isPubliclyActive
      },
      message: 'Organization completeness checked and updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get organization completeness status details
 * GET /api/crm/organizations/current/completeness-status
 */
export const getOrganizationCompletenessStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staffSession = (req as AuthenticatedRequest).user as StaffSession;

    if (!staffSession.organizationId) {
      throw new ApiError(400, 'User is not associated with any organization');
    }

    const status = await OrganizationCompletenessService.getOrganizationCompletenessStatus(staffSession.organizationId);

    res.status(200).json({
      success: true,
      data: status,
      message: 'Organization completeness status retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Publish site - runs final completeness check and publishes if all requirements are met
 * PATCH /api/crm/organizations/publish-site
 */
export const publishSite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staffSession = (req as AuthenticatedRequest).user as StaffSession;

    if (!staffSession.organizationId) {
      throw new ApiError(400, 'User is not associated with any organization');
    }

    // Run the final completeness check
    const isPubliclyActive = await OrganizationCompletenessService.checkAndSetOrganizationPublicStatus(staffSession.organizationId);

    if (!isPubliclyActive) {
      // Get detailed status to provide specific error message
      const status = await OrganizationCompletenessService.getOrganizationCompletenessStatus(staffSession.organizationId);
      
      const errorMessage = status.missingRequirements.length > 0 
        ? `Cannot publish site. Missing requirements: ${status.missingRequirements.join(', ')}`
        : 'Cannot publish site. Organization does not meet all requirements.';

      throw new ApiError(400, errorMessage, {
        missingRequirements: status.missingRequirements,
        completenessStatus: status
      });
    }

    res.status(200).json({
      success: true,
      data: {
        isPubliclyActive: true,
        publishedAt: new Date().toISOString()
      },
      message: 'Site published successfully! Your organization is now live.'
    });
  } catch (error) {
    next(error);
  }
};
