import type { Request, Response, NextFunction } from 'express';

import { 
  createOrganization, 
  updateOrganization as updateOrganizationService, 
  deleteOrganization as deleteOrganizationService,
  getOrganizationById,
  getAllOrganizations as getAllOrganizationsService 
} from '../../services/crm/organization.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { StaffSession } from '../../types/session.types.js';

/**
 * Create a new organization
 * POST /api/organizations
 */
export const createNewOrganization = async (
  req: Request, 
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
 * Get organization by ID (with authorization check)
 * GET /api/organizations/:id
 */
export const getOrganization = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, 'Organization ID is required');
    }
    
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
// export const updateOrganization = async (
//   req: Request, 
//   res: Response, 
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     if (!req.user) {
//       throw new ApiError(401, 'Authentication required');
//     }

//     const { id } = req.params;
//     const { name, subdomain, stripeAccountId, settings } = req.body;

//     if (!id) {
//       throw new ApiError(400, 'Organization ID is required');
//     }

//     const updateData = {
//       name,
//       subdomain,
//       stripeAccountId,
//       settings
//     } as any;

//     // Remove undefined values
//     Object.keys(updateData).forEach(key => 
//       updateData[key] === undefined && delete updateData[key]
//     );

//     const organization = await updateOrganizationService(id, updateData, req.user);
    
//     res.status(200).json({
//       success: true,
//       data: organization,
//       message: 'Organization updated successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Delete organization (with authorization check)
//  * DELETE /api/organizations/:id
//  */
// export const deleteOrganization = async (
//   req: Request, 
//   res: Response, 
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     // Check if user is authenticated
//     if (!req.user) {
//       throw new ApiError(401, 'Authentication required');
//     }

//     const { id } = req.params;
//     if (!id) {
//       throw new ApiError(400, 'Organization ID is required');
//     }

//     await deleteOrganizationService(id, req.user);
    
//     res.status(200).json({
//       success: true,
//       message: 'Organization deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get all organizations (admin only)
//  * GET /api/organizations
//  */
// export const getAllOrganizations = async (
//   req: Request, 
//   res: Response, 
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     // Check if user is authenticated
//     if (!req.user) {
//       throw new ApiError(401, 'Authentication required');
//     }

//     // TODO: Add admin role check here
//     // if (!req.user.isAdmin) {
//     //   throw new ApiError(403, 'Admin access required');
//     // }

//     const organizations = await getAllOrganizationsService();
    
//     res.status(200).json({
//       success: true,
//       data: organizations,
//       message: 'Organizations retrieved successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };