import { z } from 'zod';
export declare const createDonationSchema: z.ZodObject<{
    body: z.ZodObject<{
        donationData: z.ZodObject<{
            amount: z.ZodNumber;
            designationId: z.ZodString;
            donor: z.ZodObject<{
                firstName: z.ZodString;
                lastName: z.ZodString;
                email: z.ZodString;
            }, z.core.$strip>;
            answers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                questionId: z.ZodString;
                answerValue: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>;
        successUrl: z.ZodString;
        cancelUrl: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCampaignBySlugSchema: z.ZodObject<{
    params: z.ZodObject<{
        slug: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=campaign.schemas.d.ts.map