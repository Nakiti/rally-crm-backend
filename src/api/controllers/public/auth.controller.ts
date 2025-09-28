import type { Request, Response, NextFunction } from 'express';
import { 
  signUp as signUpService, 
  logIn as logInService, 
  createSession as createSessionService 
} from '../../services/public/auth.service.js';
import { ApiError } from '../../../utils/ApiError.js';

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none', 
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',
  domain: '.localhost',
};
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

    console.log(signupData);
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
 * Log in a user and create a session for the specified organization
 * POST /api/public/auth/login
 */
export const logIn = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, organization } = req.body;
    console.log(email, password, organization)

    // Validate required fields
    if (!email || !password || !organization) {
      res.status(400).json({
        success: false,
        message: 'Email, password, and organization are required'
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

    const loginData = { email, password, organization };
    const result = await logInService(loginData);

    // Set the JWT token as an HTTP-only cookie
    res.cookie('auth_token', result.token, cookieOptions);
    
    console.log('Setting cookie with options:', cookieOptions);
    console.log('Login result:', result);
    
    res.status(200).json({
      success: true,
      data: { user: result.user },
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
    console.log(req.body)
 
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

    res.cookie('auth_token', result.token, cookieOptions as any)
    
    res.status(200).json({
      success: true,
      data: {user: result.user},
      message: 'Session created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Log out the current user by clearing the authentication cookie
 * POST /api/public/auth/logout
 */
export const logOut = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Clear the authentication cookie
    res.clearCookie('auth_token');
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};
