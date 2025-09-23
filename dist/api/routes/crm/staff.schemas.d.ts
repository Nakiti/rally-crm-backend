import { z } from 'zod';
export declare const inviteStaffSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        role: z.ZodEnum<{
            admin: "admin";
            editor: "editor";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateStaffRoleSchema: z.ZodObject<{
    params: z.ZodObject<{
        staffAccountId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        role: z.ZodEnum<{
            admin: "admin";
            editor: "editor";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const removeStaffSchema: z.ZodObject<{
    params: z.ZodObject<{
        staffAccountId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=staff.schemas.d.ts.map