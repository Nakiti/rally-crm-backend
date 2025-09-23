import { z } from 'zod';
// Create donation checkout validation schema
export const createDonationSchema = z.object({
    body: z.object({
        donationData: z.object({
            amount: z.number()
                .positive('Amount must be a positive number')
                .max(999999999.99, 'Amount must be less than 1 billion'),
            designationId: z.string()
                .uuid('Designation ID must be a valid UUID'),
            donor: z.object({
                firstName: z.string()
                    .min(1, 'First name is required'),
                lastName: z.string()
                    .min(1, 'Last name is required'),
                email: z.string()
                    .email('Invalid email format')
            }),
            answers: z.array(z.object({
                questionId: z.string()
                    .uuid('Question ID must be a valid UUID'),
                answerValue: z.string()
                    .min(1, 'Answer value is required')
            })).optional()
        }),
        successUrl: z.string()
            .url('Valid success URL is required'),
        cancelUrl: z.string()
            .url('Valid cancel URL is required')
    })
});
// Get campaign by slug validation schema
export const getCampaignBySlugSchema = z.object({
    params: z.object({
        slug: z.string()
            .min(1, 'Campaign slug is required')
            .max(255, 'Campaign slug must be less than 255 characters')
            .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    })
});
//# sourceMappingURL=campaign.schemas.js.map