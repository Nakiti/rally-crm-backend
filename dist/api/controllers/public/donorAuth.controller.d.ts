import type { Request, Response, NextFunction } from 'express';
interface PublicRequest extends Request {
    subdomain?: string;
}
/**
 * Sign up a new donor or claim an existing guest account
 * POST /api/public/donor-auth/signup
 */
export declare const signUp: (req: PublicRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Log in a donor
 * POST /api/public/donor-auth/login
 */
export declare const logIn: (req: PublicRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=donorAuth.controller.d.ts.map