import type { Request, Response, NextFunction } from 'express';
import {
  getStaffForOrganization as getStaffForOrganizationService,
  inviteStaffMember as inviteStaffMemberService,
  updateStaffRole as updateStaffRoleService,
  removeStaffFromOrganization as removeStaffFromOrganizationService,
  getCurrentUser as getCurrentUserService
} from '../../services/crm/staff.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { AuthenticatedRequest } from '../../types/express.types.js';

/**
 * Get all staff members for the authenticated user's organization
 * GET /api/crm/staff
 */
export const getStaffForOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const organizationId = (req as AuthenticatedRequest).user.organizationId!;
    const staffMembers = await getStaffForOrganizationService(organizationId, (req as AuthenticatedRequest).user);
    
    res.status(200).json({
      success: true,
      data: staffMembers,
      message: 'Staff members retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Invite a new staff member to the organization
 * POST /api/crm/staff/invite
 */
export const inviteStaffMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, role } = req.body;

    // Validate required fields
    if (!email || !role) {
      res.status(400).json({
        success: false,
        message: 'Email and role are required'
      });
      return;
    }

    // Validate role
    if (!['admin', 'editor'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Role must be either "admin" or "editor"'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
      return;
    }

    const inviteData = { email, role: role as 'admin' | 'editor' };
    const result = await inviteStaffMemberService(inviteData, (req as AuthenticatedRequest).user);
    
    res.status(201).json({
      success: true,
      data: result,
      message: result.isNewAccount 
        ? 'New staff member invited and account created successfully'
        : 'Existing staff member invited successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a staff member's role within the organization
 * PATCH /api/crm/staff/:staffAccountId
 */
export const updateStaffRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { staffAccountId } = req.params;
    const { role } = req.body;

    // Validate required fields
    if (!staffAccountId) {
      res.status(400).json({
        success: false,
        message: 'Staff Account ID is required'
      });
      return;
    }

    if (!role) {
      res.status(400).json({
        success: false,
        message: 'Role is required'
      });
      return;
    }

    // Validate role
    if (!['admin', 'editor'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Role must be either "admin" or "editor"'
      });
      return;
    }

    const updateData = { role: role as 'admin' | 'editor' };
    const result = await updateStaffRoleService(staffAccountId, updateData, (req as AuthenticatedRequest).user);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Staff role updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove a staff member from the organization
 * DELETE /api/crm/staff/:staffAccountId
 */
export const removeStaffFromOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { staffAccountId } = req.params;

    // Validate required fields
    if (!staffAccountId) {
      res.status(400).json({
        success: false,
        message: 'Staff Account ID is required'
      });
      return;
    }

    const result = await removeStaffFromOrganizationService(staffAccountId, (req as AuthenticatedRequest).user);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Staff member removed from organization successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current authenticated user information
 * GET /api/crm/me
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentUser = await getCurrentUserService((req as AuthenticatedRequest).user);
    res.status(200).json({
      success: true,
      data: currentUser,
      message: 'Current user retrieved successfully'
    });
  } catch (error) {
    console.log(error)
    
    next(error);
  }
};
