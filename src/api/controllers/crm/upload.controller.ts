import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express.types';
import { generateUploadUrlForStaff } from '../../services/crm/upload.service';


/**
 * Controller to handle the request for generating a secure upload URL.
 */
export const generateSasUrl = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const fileInfo = req.body; // Validated by the Zod middleware
    const staffSession = req.user;

    const urls = await generateUploadUrlForStaff(fileInfo, staffSession);

    res.status(201).json({
      success: true,
      data: urls,
      message: 'Secure upload URL generated successfully.',
    });
  } catch (error) {
    next(error);
  }
};