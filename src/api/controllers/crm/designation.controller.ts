import type { Request, Response, NextFunction } from 'express';
import {
  createDesignation as createDesignationService,
  getDesignations as getDesignationsService,
  updateDesignation as updateDesignationService,
  archiveDesignation as archiveDesignationService
} from '../../services/crm/designation.service.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { AuthenticatedRequest } from '../../types/express.types.js';

/**
 * Create a new designation
 * POST /api/crm/designations
 */
export const createDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, goalAmount } = req.body;

    // Validate required fields
    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Name is required'
      });
      return;
    }

    const designationData = {
      name,
      description,
      goalAmount
    };

    const designation = await createDesignationService((req as AuthenticatedRequest).user, designationData);
    
    res.status(201).json({
      success: true,
      data: designation,
      message: 'Designation created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all designations for the organization
 * GET /api/crm/designations
 */
export const getAllDesignations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designations = await getDesignationsService((req as AuthenticatedRequest).user);
    
    res.status(200).json({
      success: true,
      data: designations,
      message: 'Designations retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a designation
 * PUT /api/crm/designations/:id
 */
export const updateDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, goalAmount } = req.body;

    // Validate required fields
    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Designation ID is required'
      });
      return;
    }

    const updateData = {
      name,
      description,
      goalAmount
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      (updateData as any)[key] === undefined && delete (updateData as any)[key]
    );

    const designation = await updateDesignationService((req as AuthenticatedRequest).user, id, updateData);
    
    res.status(200).json({
      success: true,
      data: designation,
      message: 'Designation updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Archive a designation (soft delete)
 * DELETE /api/crm/designations/:id
 */
export const archiveDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate required fields
    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Designation ID is required'
      });
      return;
    }

    const designation = await archiveDesignationService((req as AuthenticatedRequest).user, id);
    
    res.status(200).json({
      success: true,
      data: designation,
      message: 'Designation archived successfully'
    });
  } catch (error) {
    next(error);
  }
};
