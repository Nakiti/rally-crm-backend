import { z } from 'zod';
// Invite staff member validation schema
export const inviteStaffSchema = z.object({
    body: z.object({
        email: z.string()
            .email('Invalid email format')
            .max(255, 'Email must be less than 255 characters'),
        role: z.enum(['admin', 'editor'], {
            message: 'Role must be either "admin" or "editor"'
        })
    })
});
// Update staff role validation schema
export const updateStaffRoleSchema = z.object({
    params: z.object({
        staffAccountId: z.string()
            .uuid('Staff Account ID must be a valid UUID')
    }),
    body: z.object({
        role: z.enum(['admin', 'editor'], {
            message: 'Role must be either "admin" or "editor"'
        })
    })
});
// Remove staff member validation schema
export const removeStaffSchema = z.object({
    params: z.object({
        staffAccountId: z.string()
            .uuid('Staff Account ID must be a valid UUID')
    })
});
//# sourceMappingURL=staff.schemas.js.map