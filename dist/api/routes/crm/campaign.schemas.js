import { z } from 'zod';
// Create campaign validation schema
export const createCampaignSchema = z.object({
    body: z.object({
        defaultDesignationId: z.string()
            .uuid('Default Designation ID must be a valid UUID'),
        internalName: z.string()
            .min(1, 'Internal name is required')
            .max(255, 'Internal name must be less than 255 characters'),
        externalName: z.string()
            .max(255, 'External name must be less than 255 characters')
            .optional(),
        title: z.string()
            .min(3, 'Title must be at least 3 characters long')
            .max(255, 'Title must be less than 255 characters'),
        slug: z.string()
            .max(255, 'Slug must be less than 255 characters')
            .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
            .optional(),
        goalAmount: z.number()
            .positive('Goal amount must be a positive number')
            .max(999999999.99, 'Goal amount must be less than 1 billion'),
        icon: z.string()
            .max(255, 'Icon must be less than 255 characters')
            .optional(),
        pageConfig: z.record(z.string(), z.any())
            .optional(),
        isActive: z.boolean()
            .optional()
    })
});
// Update campaign validation schema
export const updateCampaignSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    }),
    body: z.object({
        defaultDesignationId: z.string()
            .uuid('Default Designation ID must be a valid UUID')
            .optional(),
        internalName: z.string()
            .min(1, 'Internal name is required')
            .max(255, 'Internal name must be less than 255 characters')
            .optional(),
        externalName: z.string()
            .max(255, 'External name must be less than 255 characters')
            .optional(),
        slug: z.string()
            .max(255, 'Slug must be less than 255 characters')
            .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
            .optional(),
        goalAmount: z.number()
            .positive('Goal amount must be a positive number')
            .max(999999999.99, 'Goal amount must be less than 1 billion')
            .optional(),
        icon: z.string()
            .max(255, 'Icon must be less than 255 characters')
            .optional(),
        pageConfig: z.record(z.string(), z.any())
            .optional(),
        isActive: z.boolean()
            .optional()
    })
});
// Get campaign by ID validation schema
export const getCampaignByIdSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    })
});
// Delete campaign validation schema
export const deleteCampaignSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    })
});
// Update page config validation schema
export const updatePageConfigSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    }),
    body: z.object({
        pageConfig: z.record(z.string(), z.any())
            .refine((config) => typeof config === 'object' && config !== null, 'Page config must be an object')
    })
});
// Get page config validation schema
export const getPageConfigSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    })
});
// Update campaign designations validation schema
export const updateCampaignDesignationsSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    }),
    body: z.object({
        designationIds: z.array(z.string().uuid('Each designation ID must be a valid UUID'))
            .min(0, 'Designation IDs array cannot be negative')
            .max(100, 'Cannot have more than 100 designations per campaign')
    })
});
// Update campaign questions validation schema
export const updateCampaignQuestionsSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    }),
    body: z.object({
        questions: z.array(z.object({
            id: z.string().uuid('Question ID must be a valid UUID').optional(),
            questionText: z.string()
                .min(1, 'Question text is required')
                .max(500, 'Question text must be less than 500 characters'),
            questionType: z.enum([
                'text',
                'textarea',
                'email',
                'phone',
                'number',
                'select',
                'radio',
                'checkbox',
                'date',
                'url'
            ], {
                message: 'Question type must be one of: text, textarea, email, phone, number, select, radio, checkbox, date, url'
            }),
            options: z.array(z.object({
                label: z.string().min(1, 'Option label is required'),
                value: z.string().min(1, 'Option value is required')
            })).optional(),
            isRequired: z.boolean().optional().default(false),
            displayOrder: z.number()
                .int('Display order must be an integer')
                .min(0, 'Display order must be a positive number')
                .optional().default(0)
        }))
            .min(0, 'Questions array cannot be negative')
            .max(50, 'Cannot have more than 50 questions per campaign')
    })
});
// Get top campaigns validation schema
export const getTopCampaignsSchema = z.object({
    query: z.object({
        period: z.enum(['week', 'month', 'year'])
            .optional()
            .default('month'),
        limit: z.string()
            .optional()
            .transform((val) => val ? parseInt(val, 10) : 3)
            .refine((val) => val >= 1 && val <= 20, 'Limit must be between 1 and 20')
    })
});
// Publish campaign validation schema
export const publishCampaignSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Campaign ID must be a valid UUID')
    }),
    body: z.object({
        pageConfig: z.record(z.string(), z.any())
            .refine((config) => typeof config === 'object' && config !== null, 'Page config must be an object')
    })
});
//# sourceMappingURL=campaign.schemas.js.map