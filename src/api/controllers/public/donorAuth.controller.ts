import type { Request, Response, NextFunction } from 'express';
import { registerOrClaimAccount, logIn as logInService } from '../../services/public/donorAuth.service.js';
import { getOrganizationBySubdomain } from '../../services/public/organization.service.js';
import { ApiError } from '../../../utils/ApiError.js';

// Extend Request interface to include subdomain
interface PublicRequest extends Request {
  subdomain?: string;
}

/**
 * Helper function to extract subdomain from hostname
 * @param host - The host header from the request
 * @returns The subdomain or empty string if not found
 */
function extractSubdomainFromHost(host: string): string {
  // Remove port if present
  const hostname = host.split(':')[0];
  
  // Split by dots and check if we have a subdomain
  const parts = hostname?.split('.');
  
  // If we have at least 3 parts (subdomain.domain.tld), return the first part
  if (parts && parts.length >= 3) {
    return parts[0] || '';
  }
  
  // For localhost or single domain, return empty string
  return '';
}

/**
 * Sign up a new donor or claim an existing guest account
 * POST /api/public/donor-auth/signup
 */
export const signUp = async (
  req: PublicRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse the organizationId from the request context (from the hostname)
    const subdomain = req.subdomain || extractSubdomainFromHost(req.get('host') || '');
    
    if (!subdomain) {
      throw new ApiError(400, 'Subdomain is required');
    }

    // Get organizationId from subdomain
    const organization = await getOrganizationBySubdomain(subdomain);
    const organizationId = organization.id;

    // Call the registerOrClaimAccount service, passing the organizationId and req.body
    const result = await registerOrClaimAccount(organizationId, req.body);
    
    // Send the returned JWT in the response
    res.status(201).json({
      success: true,
      data: result,
      message: 'Donor account registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Log in a donor
 * POST /api/public/donor-auth/login
 */
export const logIn = async (
  req: PublicRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse the organizationId from the request context (from the hostname)
    const subdomain = req.subdomain || extractSubdomainFromHost(req.get('host') || '');
    
    if (!subdomain) {
      throw new ApiError(400, 'Subdomain is required');
    }

    // Get organizationId from subdomain
    const organization = await getOrganizationBySubdomain(subdomain);
    const organizationId = organization.id;

    // Call the logIn service with the organizationId and req.body
    const result = await logInService(organizationId, req.body);
    
    // Send the returned JWT in the response
    res.status(200).json({
      success: true,
      data: result,
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

