import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express.types';
/**
 * Controller to handle the request for generating a secure upload URL.
 */
export declare const generateSasUrl: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=upload.controller.d.ts.map