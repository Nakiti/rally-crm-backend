import { z } from 'zod';
// Get organization page by ID and type validation schema
export const getOrganizationPageByTypeSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Organization ID must be a valid UUID'),
        pageType: z.enum(['landing', 'about'], {
            message: 'Page type must be either "landing" or "about"'
        })
    })
});
// Get organization page by subdomain and type validation schema
export const getOrganizationPageBySubdomainAndTypeSchema = z.object({
    params: z.object({
        subdomain: z.string()
            .min(1, 'Subdomain is required')
            .max(255, 'Subdomain must be less than 255 characters')
            .regex(/^[a-z0-9-]+$/, 'Subdomain must contain only lowercase letters, numbers, and hyphens'),
        pageType: z.enum(['landing', 'about'], {
            message: 'Page type must be either "landing" or "about"'
        })
    })
});
// Get organization pages by ID validation schema
export const getOrganizationPagesSchema = z.object({
    params: z.object({
        id: z.string()
            .uuid('Organization ID must be a valid UUID')
    })
});
// Get organization pages by subdomain validation schema
export const getOrganizationPagesBySubdomainSchema = z.object({
    params: z.object({
        subdomain: z.string()
            .min(1, 'Subdomain is required')
            .max(255, 'Subdomain must be less than 255 characters')
            .regex(/^[a-z0-9-]+$/, 'Subdomain must contain only lowercase letters, numbers, and hyphens')
    })
});
//# sourceMappingURL=organizationPage.schemas.js.map