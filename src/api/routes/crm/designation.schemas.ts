import { z } from 'zod';

// Schema for creating a new designation
export const createDesignationSchema = z.object({
  body: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters long')
      .max(255, 'Name must be less than 255 characters'),
    
    description: z.string()
      .max(1000, 'Description must be less than 1000 characters')
      .optional(),
    
    goalAmount: z.number()
      .min(0, 'Goal amount must be a positive number')
      .optional()
  })
});

// Schema for updating a designation
export const updateDesignationSchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid designation ID is required')
  }),
  
  body: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters long')
      .max(255, 'Name must be less than 255 characters')
      .optional(),
    
    description: z.string()
      .max(1000, 'Description must be less than 1000 characters')
      .optional(),
    
    goalAmount: z.number()
      .min(0, 'Goal amount must be a positive number')
      .optional()
  })
});

// Schema for getting a specific designation by ID
export const getDesignationSchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid designation ID is required')
  })
});

// Schema for archiving a designation
export const archiveDesignationSchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid designation ID is required')
  })
});
