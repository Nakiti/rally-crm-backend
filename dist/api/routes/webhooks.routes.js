import { Router } from 'express';
import { StripeController } from '../controllers/crm/stripe.controller.js';
import { validate } from '../middleware/validate.js';
import { stripeSchemas } from './crm/stripe.schemas.js';
const router = Router();
const stripeController = new StripeController();
/**
 * @route POST /api/webhooks/stripe
 * @desc Handle Stripe webhooks
 * @access Public (webhook endpoint)
 */
router.post('/stripe', validate(stripeSchemas.handleWebhook), stripeController.handleWebhook);
export default router;
//# sourceMappingURL=webhooks.routes.js.map