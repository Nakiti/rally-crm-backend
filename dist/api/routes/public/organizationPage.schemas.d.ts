import { z } from 'zod';
export declare const getOrganizationPageByTypeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
        pageType: z.ZodEnum<{
            landing: "landing";
            about: "about";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrganizationPageBySubdomainAndTypeSchema: z.ZodObject<{
    params: z.ZodObject<{
        subdomain: z.ZodString;
        pageType: z.ZodEnum<{
            landing: "landing";
            about: "about";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrganizationPagesSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrganizationPagesBySubdomainSchema: z.ZodObject<{
    params: z.ZodObject<{
        subdomain: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=organizationPage.schemas.d.ts.map