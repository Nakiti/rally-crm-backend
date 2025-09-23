import type { Request, Response, NextFunction } from 'express';
/**
 * Sign up a new organization with the first admin user
 * POST /api/public/auth/signup
 */
export declare const signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Log in a user and create a session for the specified organization
 * POST /api/public/auth/login
 */
export declare const logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create a session JWT for a specific organization
 * POST /api/public/auth/session
 */
export declare const createSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Log out the current user by clearing the authentication cookie
 * POST /api/public/auth/logout
 */
export declare const logOut: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map