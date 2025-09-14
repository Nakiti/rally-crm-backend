import { Request, Response, NextFunction } from 'express';
import { StaffUser } from '../../../models';
import { 
  createOrganization, 
  getOrganizationForStaff, 
  updateOrganization as updateOrganizationService, 
  deleteOrganization as deleteOrganizationService,
  getOrganizationById,
  getAllOrganizations as getAllOrganizationsService 
} from '../../services/crm/organization.service';
import { ApiError } from '../../../utils/ApiError';

// Extend Request interface to include user
interface AuthenticatedRequest extends Request {
  user: StaffUser;
}

/**
 * Create a new organization
 * POST /api/organizations
 */
export const createNewOrganization = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { name, subdomain, stripeAccountId, settings } = req.body;


    const organizationData = {
      name,
      subdomain,
      stripeAccountId,
      settings
    };

    const organization = await createOrganization(organizationData);
    
    res.status(201).json({
      success: true,
      data: organization,
      message: 'Organization created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get organization details for authenticated staff member
 * GET /api/organizations/me
 */
export const getMyOrganization = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    const organization = await getOrganizationForStaff(req.user);
    
    res.status(200).json({
      success: true,
      data: organization,
      message: 'Organization retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get organization by ID (with authorization check)
 * GET /api/organizations/:id
 */
export const getOrganization = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    const { id } = req.params;
    const organization = await getOrganizationById(id, req.user);
    
    res.status(200).json({
      success: true,
      data: organization,
      message: 'Organization retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update organization (with authorization check)
 * PUT /api/organizations/:id
 */
export const updateOrganization = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {

    const { id } = req.params;
    const { name, subdomain, stripeAccountId, settings } = req.body;


    const updateData = {
      name,
      subdomain,
      stripeAccountId,
      settings
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const organization = await updateOrganizationService(id, updateData, req.user);
    
    res.status(200).json({
      success: true,
      data: organization,
      message: 'Organization updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete organization (with authorization check)
 * DELETE /api/organizations/:id
 */
export const deleteOrganization = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    const { id } = req.params;
    await deleteOrganizationService(id, req.user);
    
    res.status(200).json({
      success: true,
      message: 'Organization deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all organizations (admin only)
 * GET /api/organizations
 */
export const getAllOrganizations = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    // TODO: Add admin role check here
    // if (!req.user.isAdmin) {
    //   throw new ApiError(403, 'Admin access required');
    // }

    const organizations = await getAllOrganizationsService();
    
    res.status(200).json({
      success: true,
      data: organizations,
      message: 'Organizations retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};