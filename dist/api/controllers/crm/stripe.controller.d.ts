import { Request, Response, NextFunction } from 'express';
export declare class StripeController {
    private stripeService;
    constructor();
    /**
     * Create Stripe Connect account for organization
     */
    createConnectAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Create account link for onboarding
     */
    createAccountLink: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Handle Stripe webhooks
     */
    handleWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Create checkout session for donation
     */
    createCheckoutSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=stripe.controller.d.ts.map