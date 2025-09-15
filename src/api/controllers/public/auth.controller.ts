import type { Request, Response, NextFunction } from 'express';
import { 
  signUp as signUpService, 
  logIn as logInService, 
  createSession as createSessionService 
} from '../../services/public/auth.service.js';
import { ApiError } from '../../../utils/ApiError.js';

/**
 * Sign up a new organization with the first admin user
 * POST /api/public/auth/signup
 */
export const signUp = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { 
      organizationName, 
      organizationSubdomain, 
      firstName, 
      lastName, 
      email, 
      password 
    } = req.body;

    // Validate required fields
    if (!organizationName || !organizationSubdomain || !firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'All fields are required: organizationName, organizationSubdomain, firstName, lastName, email, password'
      });
      return;
    }

    // Validate subdomain format (basic validation)
    const subdomainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    if (!subdomainRegex.test(organizationSubdomain)) {
      res.status(400).json({
        success: false,
        message: 'Invalid subdomain format. Subdomain must contain only letters, numbers, and hyphens, and cannot start or end with a hyphen.'
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

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
      return;
    }

    const signupData = {
      organizationName,
      organizationSubdomain,
      firstName,
      lastName,
      email,
      password
    };

    const result = await signUpService(signupData);
    
    res.status(201).json({
      success: true,
      data: result,
      message: 'Organization and admin account created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Log in a user and return their organization memberships
 * POST /api/public/auth/login
 */
export const logIn = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
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

    const loginData = { email, password };
    const result = await logInService(loginData);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a session JWT for a specific organization
 * POST /api/public/auth/session
 */
export const createSession = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, staffAccountId } = req.body;

    // Validate required fields
    if (!organizationId || !staffAccountId) {
      res.status(400).json({
        success: false,
        message: 'Organization ID and Staff Account ID are required'
      });
      return;
    }

    const sessionData = { organizationId, staffAccountId };
    const result = await createSessionService(sessionData);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Session created successfully'
    });
  } catch (error) {
    next(error);
  }
};
