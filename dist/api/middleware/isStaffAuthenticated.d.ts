import type { Response, NextFunction, Request } from 'express';
/**
 * Middleware to authenticate staff users via a session-aware JWT.
 * It verifies the token, confirms the user is a member of the specified organization,
 * and attaches a rich user context to the request.
 */
export declare const isStaffAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isStaffAuthenticated.d.ts.map