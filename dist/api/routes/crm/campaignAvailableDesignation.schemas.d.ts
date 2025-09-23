import { z } from 'zod';
export declare const createCampaignAvailableDesignationSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        designationId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCampaignAvailableDesignationsSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCampaignAvailableDesignationSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteCampaignAvailableDesignationSchema: z.ZodObject<{
    params: z.ZodObject<{
        campaignId: z.ZodString;
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=campaignAvailableDesignation.schemas.d.ts.map