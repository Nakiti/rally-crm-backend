import { z } from 'zod';

export const statsSchemas = {
    getStatsSummary: {
        query: z.object({
            period: z.enum(['week', 'month', 'year']).optional().default('month')
        })
    }
};
