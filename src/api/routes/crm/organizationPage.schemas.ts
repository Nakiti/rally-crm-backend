import { z } from 'zod';

// Create organization page validation schema
export const createOrganizationPageSchema = z.object({
  body: z.object({
    pageType: z.enum(['landing', 'about'], {
      message: 'Page type must be either "landing" or "about"'
    }),
    
    contentConfig: z.record(z.string(), z.any())
      .optional()
  })
});

// Update organization page validation schema
export const updateOrganizationPageSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid('Organization page ID must be a valid UUID')
  }),
  
  body: z.object({
    pageType: z.enum(['landing', 'about'], {
      message: 'Page type must be either "landing" or "about"'
    }).optional(),
    
    contentConfig: z.record(z.string(), z.any())
      .optional()
  })
});

// Get organization page by ID validation schema
export const getOrganizationPageByIdSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid('Organization page ID must be a valid UUID')
  })
});

// Get organization page by type validation schema
export const getOrganizationPageByTypeSchema = z.object({
  params: z.object({
    pageType: z.enum(['landing', 'about'], {
      message: 'Page type must be either "landing" or "about"'
    })
  })
});

// Delete organization page validation schema
export const deleteOrganizationPageSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid('Organization page ID must be a valid UUID')
  })
});

// Update content config validation schema
export const updateContentConfigSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid('Organization page ID must be a valid UUID')
  }),
  
  body: z.object({
    contentConfig: z.record(z.string(), z.any())
      .refine(
        (config) => typeof config === 'object' && config !== null,
        'Content config must be an object'
      )
  })
});

// Get content config validation schema
export const getContentConfigSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid('Organization page ID must be a valid UUID')
  })
});
