import Stripe from 'stripe';
import { ApiError } from '../../../utils/ApiError.js';
import { Organization } from '../../../models/organization.model.js';
import { Donation } from '../../../models/donation.model.js';
import { DonorAccount } from '../../../models/donorAccount.model.js';
import { Campaign } from '../../../models/campaign.model.js';
import dotenv from "dotenv"

dotenv.config()

export class StripeService {
    private stripe: Stripe;

    constructor() {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY environment variable is required');
        }
        
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia',
        });
    }

    /**
     * Create a Stripe Connect account for an organization
     */
    async createConnectAccount(organizationId: string, email: string): Promise<string> {
        try {
            // Create Express account for the organization
            const account = await this.stripe.accounts.create({
                type: 'express',
                country: 'US', // You might want to make this configurable
                email: email, // Will be collected during onboarding
            });

            // Update organization with Stripe account ID
            await Organization.update(
                { stripeAccountId: account.id },
                { where: { id: organizationId } }
            );

            // console.log(account)

            return account.id;
        } catch (error) {
            console.error('Error creating Stripe Connect account:', error);
            throw new ApiError(500, 'Failed to create Stripe Connect account');
        }
    }

    /**
     * Create account link for onboarding
     */
    async createAccountLink(accountId: string, returnUrl: string, refreshUrl: string): Promise<string> {
        try {
            const accountLink = await this.stripe.accountLinks.create({
                account: accountId,
                return_url: returnUrl,
                refresh_url: refreshUrl,
                type: 'account_onboarding',
            });

            return accountLink.url;
        } catch (error) {
            console.error('Error creating account link:', error);
            throw new ApiError(500, 'Failed to create account link');
        }
    }

      /**
   * The main orchestrator function. It finds the organization, creates a Stripe
   * account if needed, and always returns a fresh onboarding link.
   * @param staffSession The authenticated user's session.
   */
    public async getOrCreateOnboardingLink(staffSession: StaffSession): Promise<string> {
        try {
        // 1. --- Find the User's Organization ---
        const organization = await Organization.findByPk(staffSession.organizationId);
        if (!organization) {
            throw new ApiError(404, 'Organization not found.');
        }

        let stripeAccountId = organization.stripeAccountId;

        // 2. --- Create a Stripe Account IF ONE DOESN'T EXIST ---
        if (!stripeAccountId) {
            const account = await this.stripe.accounts.create({
            type: 'express',
            country: 'US',
            email: staffSession.email,
            });
            stripeAccountId = account.id;
            
            // Save the new ID to our database
            await organization.update({ stripeAccountId: stripeAccountId });
        }

        // 3. --- Create and Return the Account Link ---
        // This step runs every time, ensuring a fresh, valid link is generated.
        const returnUrl = `${process.env.FRONTEND_URL}/settings/payments?status=success`;
        const refreshUrl = `${process.env.FRONTEND_URL}/settings/payments?status=refresh`;

        const accountLink = await this.stripe.accountLinks.create({
            account: stripeAccountId,
            return_url: returnUrl,
            refresh_url: refreshUrl,
            type: 'account_onboarding',
        });

        return accountLink.url;

        } catch (error) {
        console.error('Error in Stripe onboarding flow:', error);
        throw new ApiError(500, 'Failed to create Stripe onboarding link.');
        }
    }
    

    /**
     * Create checkout session for donation
     */
    async createDonationCheckoutSession(
        amount: number,
        campaignId: string,
        donorEmail: string,
        donorName: string,
        organizationId: string,
        successUrl: string,
        cancelUrl: string
    ): Promise<string> {
        try {
            // Get organization to find their Stripe account ID
            const organization = await Organization.findByPk(organizationId);
            if (!organization || !organization.stripeAccountId) {
                throw new ApiError(400, 'Organization not found or not connected to Stripe');
            }

            // Calculate application fee (e.g., 2.9% + 30 cents)
            const applicationFeeAmount = Math.round(amount * 0.029 + 30);

            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Donation',
                            },
                            unit_amount: amount,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: successUrl,
                cancel_url: cancelUrl,
                customer_email: donorEmail,
                metadata: {
                    campaignId,
                    organizationId,
                    donorEmail,
                    donorName,
                },
                payment_intent_data: {
                    application_fee_amount: applicationFeeAmount,
                    transfer_data: {
                        destination: organization.stripeAccountId,
                    },
                },
            });

            return session.id;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw new ApiError(500, 'Failed to create checkout session');
        }
    }

    /**
     * Verify webhook signature and construct event
     */
    async constructWebhookEvent(payload: string | Buffer, signature: string): Promise<Stripe.Event> {
        try {
            if (!process.env.STRIPE_WEBHOOK_SECRET) {
                throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
            }

            return this.stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
            console.error('Error verifying webhook signature:', error);
            throw new ApiError(400, 'Invalid webhook signature');
        }
    }

    /**
     * Handle checkout session completed event
     */
    async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
        try {
            const { campaignId, organizationId, donorEmail, donorName } = session.metadata || {};
            
            if (!campaignId || !organizationId || !donorEmail || !donorName) {
                throw new ApiError(400, 'Missing required metadata in checkout session');
            }

            // Get the payment intent to extract charge ID
            const paymentIntent = await this.stripe.paymentIntents.retrieve(
                session.payment_intent as string
            );

            const chargeId = paymentIntent.latest_charge as string;
            const amount = session.amount_total || 0;

            // Find or create donor
            let donor = await DonorAccount.findOne({
                where: { email: donorEmail, organizationId }
            });

            if (!donor) {
                donor = await DonorAccount.create({
                    email: donorEmail,
                    name: donorName,
                    organizationId,
                });
            }

            // Create donation record
            await Donation.create({
                amount,
                campaignId,
                donorId: donor.id,
                organizationId,
                stripeChargeId: chargeId,
                status: 'succeeded',
            });

            console.log(`Donation processed successfully: ${amount} cents for campaign ${campaignId}`);
        } catch (error) {
            console.error('Error handling checkout session completed:', error);
            throw error;
        }
    }

    /**
     * Handle account updated event
     */
    async handleAccountUpdated(account: Stripe.Account): Promise<void> {
        try {
            // Find organization by Stripe account ID
            const organization = await Organization.findOne({
                where: { stripeAccountId: account.id }
            });

            if (!organization) {
                console.warn(`Organization not found for Stripe account: ${account.id}`);
                return;
            }

            // Update organization settings based on account status
            const settings = organization.settings || {};
            settings.stripeAccountStatus = account.details_submitted ? 'verified' : 'pending';
            settings.stripeChargesEnabled = account.charges_enabled;
            settings.stripePayoutsEnabled = account.payouts_enabled;

            await Organization.update(
                { settings },
                { where: { id: organization.id } }
            );

            console.log(`Updated organization ${organization.id} Stripe account status`);
        } catch (error) {
            console.error('Error handling account updated:', error);
            throw error;
        }
    }

    /**
     * Get account link for existing account
     */
    async getAccountLink(accountId: string, returnUrl: string, refreshUrl: string): Promise<string> {
        try {
            const accountLink = await this.stripe.accountLinks.create({
                account: accountId,
                return_url: returnUrl,
                refresh_url: refreshUrl,
                type: 'account_onboarding',
            });

            return accountLink.url;
        } catch (error) {
            console.error('Error creating account link:', error);
            throw new ApiError(500, 'Failed to create account link');
        }
    }
}
