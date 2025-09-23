import { z } from 'zod';
export declare const statsSchemas: {
    getStatsSummary: {
        query: z.ZodObject<{
            period: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
                week: "week";
                month: "month";
                year: "year";
            }>>>;
        }, z.core.$strip>;
    };
};
//# sourceMappingURL=stats.schemas.d.ts.map