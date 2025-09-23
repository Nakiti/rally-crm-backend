import { z } from 'zod';
export const generateSasUrlSchema = z.object({
    body: z.object({
        fileName: z.string().min(1, 'File name is required.'),
        fileType: z.string().startsWith('image/', 'Only image files are allowed.'),
    }),
});
//# sourceMappingURL=upload.schemas.js.map