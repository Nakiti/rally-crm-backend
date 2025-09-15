import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
  body: z.object({
    organizationName: z.string()
      .min(1, 'Organization name is required')
      .max(255, 'Organization name must be less than 255 characters'),
    
    organizationSubdomain: z.string()
      .min(1, 'Organization subdomain is required')
      .max(255, 'Organization subdomain must be less than 255 characters')
      .regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/, 
        'Subdomain must contain only letters, numbers, and hyphens, and cannot start or end with a hyphen'),
    
    firstName: z.string()
      .min(1, 'First name is required')
      .max(255, 'First name must be less than 255 characters'),
    
    lastName: z.string()
      .min(1, 'Last name is required')
      .max(255, 'Last name must be less than 255 characters'),
    
    email: z.string()
      .email('Invalid email format')
      .max(255, 'Email must be less than 255 characters'),
    
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(255, 'Password must be less than 255 characters')
  })
});

// Login validation schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .email('Invalid email format')
      .max(255, 'Email must be less than 255 characters'),
    
    password: z.string()
      .min(1, 'Password is required')
      .max(255, 'Password must be less than 255 characters')
  })
});

// Session creation validation schema
export const sessionSchema = z.object({
  body: z.object({
    organizationId: z.string()
      .uuid('Organization ID must be a valid UUID'),
    
    staffAccountId: z.string()
      .uuid('Staff Account ID must be a valid UUID')
  })
});
