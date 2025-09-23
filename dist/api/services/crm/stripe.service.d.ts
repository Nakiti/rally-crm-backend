import Stripe from 'stripe';
export declare class StripeService {
    private stripe;
    constructor();
    /**
     * Create a Stripe Connect account for an organization
     */
    createConnectAccount(organizationId: string, email: string): Promise<string>;
    /**
     * Create account link for onboarding
     */
    createAccountLink(accountId: string, returnUrl: string, refreshUrl: string): Promise<string>;
    /**
     * Create checkout session for donation
     */
    createDonationCheckoutSession(amount: number, campaignId: string, donorEmail: string, donorName: string, organizationId: string, successUrl: string, cancelUrl: string): Promise<string>;
    /**
     * Verify webhook signature and construct event
     */
    constructWebhookEvent(payload: string | Buffer, signature: string): Promise<Stripe.Event>;
    /**
     * Handle checkout session completed event
     */
    handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void>;
    /**
     * Handle account updated event
     */
    handleAccountUpdated(account: Stripe.Account): Promise<void>;
    /**
     * Get account link for existing account
     */
    getAccountLink(accountId: string, returnUrl: string, refreshUrl: string): Promise<string>;
}
//# sourceMappingURL=stripe.service.d.ts.map