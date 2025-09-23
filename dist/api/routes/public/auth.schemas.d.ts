import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    body: z.ZodObject<{
        organizationName: z.ZodString;
        organizationSubdomain: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
        organization: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const sessionSchema: z.ZodObject<{
    body: z.ZodObject<{
        organizationId: z.ZodString;
        staffAccountId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=auth.schemas.d.ts.map