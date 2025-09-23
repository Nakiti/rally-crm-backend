import { z } from 'zod';
// Donor signup validation schema
export const donorSignupSchema = z.object({
    body: z.object({
        firstName: z.string()
            .min(1, 'First name is required')
            .max(255, 'First name must be less than 255 characters'),
        lastName: z.string()
            .min(1, 'Last name is required')
            .max(255, 'Last name must be less than 255 characters'),
        email: z.string()
            .email('Invalid email format')
            .max(255, 'Email must be less than 255 characters'),
        password: z.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(255, 'Password must be less than 255 characters')
    })
});
// Donor login validation schema
export const donorLoginSchema = z.object({
    body: z.object({
        email: z.string()
            .email('Invalid email format')
            .max(255, 'Email must be less than 255 characters'),
        password: z.string()
            .min(1, 'Password is required')
            .max(255, 'Password must be less than 255 characters')
    })
});
//# sourceMappingURL=donorAuth.schemas.js.map