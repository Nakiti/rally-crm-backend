import { Request, Response, NextFunction } from 'express';
import { StripeService } from '../../services/crm/stripe.service.js';
import { ApiError } from '../../../utils/ApiError.js';

export class StripeController {
    private stripeService: StripeService;

    constructor() {
        this.stripeService = new StripeService();
    }

    /**
     * Create Stripe Connect account for organization
     */
    createConnectAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const organizationId = req.user?.organizationId;
            const email = req.user?.email
            
            if (!organizationId) {
                throw new ApiError(401, 'Organization ID not found in request');
            }

            const accountId = await this.stripeService.createConnectAccount(organizationId, email);

            res.status(200).json({
                success: true,
                data: { accountId },
                message: 'Stripe Connect account created successfully'
            }); 

        } catch (error) {
            next(error);
        }
    };

    /**
     * Create account link for onboarding
     */
    createAccountLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { accountId, returnUrl, refreshUrl } = req.body;
            
            if (!accountId || !returnUrl || !refreshUrl) {
                throw new ApiError(400, 'accountId, returnUrl, and refreshUrl are required');
            }

            const linkUrl = await this.stripeService.createAccountLink(accountId, returnUrl, refreshUrl);

            res.status(200).json({
                success: true,
                data: { linkUrl },
                message: 'Account link created successfully'
            });

        } catch (error) {
            next(error);
        }
    };

      /**
     * Creates a Stripe Connect account if one doesn't exist,
     * and then generates and returns a one-time-use onboarding link.
     */
    createOnboardingLink = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
        const staffSession = req.user; // Get the user from the isStaffAuthenticated middleware

        if (!staffSession) {
            throw new ApiError(401, 'Authentication required.');
        }

        // This single service call now handles the entire complex flow.
        const linkUrl = await this.stripeService.getOrCreateOnboardingLink(staffSession);
        console.log(linkUrl)

        res.status(200).json({
            success: true,
            data: { url: linkUrl }, // Return the URL directly
            message: 'Account link created successfully'
        });
        } catch (error) {
        next(error);
        }
    };


    /**
     * Handle Stripe webhooks
     */
    handleWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const signature = req.headers['stripe-signature'] as string;
            
            if (!signature) {
                throw new ApiError(400, 'Missing Stripe signature');
            }

            // Get raw body for webhook verification
            const payload = req.body;
            
            // Verify webhook signature and construct event
            const event = await this.stripeService.constructWebhookEvent(payload, signature);

            // Handle different event types
            switch (event.type) {
                case 'checkout.session.completed':
                    await this.stripeService.handleCheckoutSessionCompleted(event.data.object as any);
                    break;
                
                case 'account.updated':
                    await this.stripeService.handleAccountUpdated(event.data.object as any);
                    break;
                
                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }

            res.status(200).json({ received: true });

        } catch (error) {
            console.error('Webhook error:', error);
            next(error);
        }
    };

    /**
     * Create checkout session for donation
     */
    createCheckoutSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { 
                amount, 
                campaignId, 
                donorEmail, 
                donorName, 
                successUrl, 
                cancelUrl 
            } = req.body;

            const organizationId = req.user?.organizationId;
            
            if (!organizationId) {
                throw new ApiError(401, 'Organization ID not found in request');
            }

            if (!amount || !campaignId || !donorEmail || !donorName || !successUrl || !cancelUrl) {
                throw new ApiError(400, 'All fields are required');
            }

            const sessionId = await this.stripeService.createDonationCheckoutSession(
                amount,
                campaignId,
                donorEmail,
                donorName,
                organizationId,
                successUrl,
                cancelUrl
            );

            res.status(200).json({
                success: true,
                data: { sessionId },
                message: 'Checkout session created successfully'
            });

        } catch (error) {
            next(error);
        }
    };
}
