import type { Response, NextFunction, Request } from 'express';
/**
 * Middleware to authenticate donor users via a JWT.
 * It verifies the token, confirms the donor account exists and is associated with the organization,
 * and attaches the donor session context to the request.
 */
export declare const isDonorAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isDonorAuthenticated.d.ts.map