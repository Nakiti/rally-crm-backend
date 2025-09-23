import { z } from 'zod';
export declare const stripeSchemas: {
    createConnectAccount: {
        body: z.ZodObject<{}, z.core.$strip>;
    };
    createAccountLink: {
        body: z.ZodObject<{
            accountId: z.ZodString;
            returnUrl: z.ZodString;
            refreshUrl: z.ZodString;
        }, z.core.$strip>;
    };
    createCheckoutSession: {
        body: z.ZodObject<{
            amount: z.ZodNumber;
            campaignId: z.ZodString;
            donorEmail: z.ZodString;
            donorName: z.ZodString;
            successUrl: z.ZodString;
            cancelUrl: z.ZodString;
        }, z.core.$strip>;
    };
    handleWebhook: {
        body: z.ZodAny;
    };
};
//# sourceMappingURL=stripe.schemas.d.ts.map