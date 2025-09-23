import { z } from 'zod';

// Schema for getting paginated donations with optional filters
export const getDonationsSchema = z.object({
  query: z.object({
    // Pagination parameters
    page: z.string()
      .optional()
      .transform((val) => val ? parseInt(val, 10) : 1)
      .refine((val) => val >= 1, 'Page must be a positive integer'),
    
    limit: z.string()
      .optional()
      .transform((val) => val ? parseInt(val, 10) : 20)
      .refine((val) => val >= 1 && val <= 100, 'Limit must be between 1 and 100'),
    
    // Filtering parameters
    status: z.string()
      .optional()
      .refine((val) => !val || ['pending', 'completed', 'failed', 'refunded'].includes(val), 
        'Status must be one of: pending, completed, failed, refunded'),
    
    campaignId: z.string()
      .optional()
      .refine((val) => !val || z.string().uuid().safeParse(val).success, 
        'Campaign ID must be a valid UUID'),
    
    designationId: z.string()
      .optional()
      .refine((val) => !val || z.string().uuid().safeParse(val).success, 
        'Designation ID must be a valid UUID'),
    
    donorEmail: z.string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, 
        'Donor email must be a valid email format'),
    
    dateFrom: z.string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), 
        'Date from must be a valid ISO date string'),
    
    dateTo: z.string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), 
        'Date to must be a valid ISO date string')
  })
});

// Schema for getting recent donations
export const getRecentDonationsSchema = z.object({
  query: z.object({
    limit: z.string()
      .optional()
      .transform((val) => val ? parseInt(val, 10) : 5)
      .refine((val) => val >= 1 && val <= 50, 'Limit must be between 1 and 50')
  })
});

// Schema for getting a specific donation by ID
export const getDonationDetailsSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid('Donation ID must be a valid UUID')
  })
});

