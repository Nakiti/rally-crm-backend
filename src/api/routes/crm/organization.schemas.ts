import { z } from 'zod';

// Schema for creating a new organization
export const createOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    subdomain: z
      .string()
      .min(3, 'Subdomain must be at least 3 characters long')
      .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'),
  }),
});

// Schema for updating an organization
export const updateOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
    subdomain: z
      .string()
      .min(3, 'Subdomain must be at least 3 characters long')
      .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens')
      .optional(),
    stripeAccountId: z.string().optional(),
    settings: z.object({}).optional(),
  }),
  params: z.object({
    id: z.string().uuid('A valid organization ID is required'),
  }),
});

