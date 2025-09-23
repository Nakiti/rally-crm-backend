import { z } from 'zod';

export const stripeSchemas = {
    createConnectAccount: {
        body: z.object({})
    },
    
    createAccountLink: {
        body: z.object({
            accountId: z.string().min(1, 'Account ID is required'),
            returnUrl: z.string().url('Valid return URL is required'),
            refreshUrl: z.string().url('Valid refresh URL is required')
        })
    },
    
    createCheckoutSession: {
        body: z.object({
            amount: z.number().int().positive('Amount must be a positive integer'),
            campaignId: z.string().min(1, 'Campaign ID is required'),
            donorEmail: z.string().email('Valid email is required'),
            donorName: z.string().min(1, 'Donor name is required'),
            successUrl: z.string().url('Valid success URL is required'),
            cancelUrl: z.string().url('Valid cancel URL is required')
        })
    },
    
    handleWebhook: {
        body: z.any() // Webhook payload can be any structure
    }
};
