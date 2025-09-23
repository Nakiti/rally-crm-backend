import { Response, NextFunction, Request } from 'express';
declare global {
    namespace Express {
        interface Request {
            staffAccountId?: string;
        }
    }
}
/**
 * Middleware to verify a temporary "global authentication" JWT.
 * This is used to secure the second step of the staff login flow (session creation).
 * It verifies the tempToken and attaches the staffAccountId to the request.
 */
export declare const isGloballyAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isGloballyAuthenticated.d.ts.map