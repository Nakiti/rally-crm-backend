import { Router } from 'express';
import {
  getPublicCampaign,
  createDonation
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
 * @route   POST /api/public/campaigns/:slug/donations
 * @desc    Create a donation for a campaign
 * @access  Public
 */
router.post('/:slug/donations', validate(createDonationSchema), createDonation);

export default router;
