import { z } from 'zod';
export declare const createOrganizationPageSchema: z.ZodObject<{
    body: z.ZodObject<{
        pageType: z.ZodEnum<{
            landing: "landing";
            about: "about";
        }>;
        contentConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateOrganizationPageSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        pageType: z.ZodOptional<z.ZodEnum<{
            landing: "landing";
            about: "about";
        }>>;
        contentConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrganizationPageByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrganizationPageByTypeSchema: z.ZodObject<{
    params: z.ZodObject<{
        pageType: z.ZodEnum<{
            landing: "landing";
            about: "about";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteOrganizationPageSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateContentConfigSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        contentConfig: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getContentConfigSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const publishOrganizationPageSchema: z.ZodObject<{
    params: z.ZodObject<{
        pageSlug: z.ZodEnum<{
            landing: "landing";
            about: "about";
        }>;
    }, z.core.$strip>;
    body: z.ZodObject<{
        contentConfig: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=organizationPage.schemas.d.ts.map