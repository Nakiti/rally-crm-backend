import { Router } from 'express';
import { StripeController } from '../../controllers/crm/stripe.controller.js';
import { isStaffAuthenticated } from '../../middleware/isStaffAuthenticated.js';
import { validate } from '../../middleware/validate.js';
import { stripeSchemas } from './stripe.schemas.js';

const router = Router();
const stripeController = new StripeController();

/**
 * @route POST /api/crm/stripe/connect-account
 * @desc Create Stripe Connect account for organization
 * @access Staff only
 */
router.post('/connect-account', isStaffAuthenticated, validate(stripeSchemas.createConnectAccount.body), stripeController.createConnectAccount);

router.post('/onboarding-link', isStaffAuthenticated, validate(stripeSchemas.createConnectAccount.body), stripeController.createOnboardingLink)

/**
 * @route POST /api/crm/stripe/account-link
 * @desc Create account link for onboarding
 * @access Staff only
 */
router.post('/account-link', isStaffAuthenticated, validate(stripeSchemas.createAccountLink.body), stripeController.createAccountLink);

/**
 * @route POST /api/crm/stripe/checkout-session
 * @desc Create checkout session for donation
 * @access Staff only
 */
router.post('/checkout-session', isStaffAuthenticated, validate(stripeSchemas.createCheckoutSession.body), stripeController.createCheckoutSession);

export default router;
