import { Router } from 'express';
import {
  getPublicCampaign,
  createDonationCheckout
} from '../../controllers/public/campaign.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createDonationSchema,
  getCampaignBySlugSchema
} from './campaign.schemas.js';

const router = Router();

/**
 * @route   GET /api/public/campaigns/:slug
 * @desc    Get a public campaign by slug
 * @access  Public
 */
router.get('/:slug', validate(getCampaignBySlugSchema), getPublicCampaign);

/**
 * @route   POST /api/public/campaigns/:slug/checkout
 * @desc    Create a Stripe checkout session for a campaign donation
 * @access  Public
 */
router.post('/:slug/checkout', validate(createDonationSchema), createDonationCheckout);

export default router;
