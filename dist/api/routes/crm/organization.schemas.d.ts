import { z } from 'zod';
export declare const createOrganizationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        subdomain: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateOrganizationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        subdomain: z.ZodOptional<z.ZodString>;
        stripeAccountId: z.ZodOptional<z.ZodString>;
        settings: z.ZodOptional<z.ZodObject<{
            url: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            zipcode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCurrentOrganizationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        subdomain: z.ZodOptional<z.ZodString>;
        stripeAccountId: z.ZodOptional<z.ZodString>;
        settings: z.ZodOptional<z.ZodObject<{
            url: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            zipcode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=organization.schemas.d.ts.map